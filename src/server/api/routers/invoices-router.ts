import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { BankAccountsTable, InvoicesTable } from '~/server/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import {
  CreateInvoiceParams,
  EditInvoiceParams,
} from '~/procedure-params/invoices-params';
import { z } from '~/utils/zod-pt';
import { TRPCError } from '@trpc/server';

export const invoicesRouter = createTRPCRouter({
  getByAccountId: privateProcedure
    .input(z.object({ accountId: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(InvoicesTable)
        .where(eq(InvoicesTable.accountId, input.accountId))
        .orderBy(desc(InvoicesTable.dueDate));
    }),

  getById: privateProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [invoice] = await ctx.db
        .select()
        .from(InvoicesTable)
        .where(eq(InvoicesTable.id, input.id));

      return invoice;
    }),

  create: privateProcedure
    .input(CreateInvoiceParams)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(InvoicesTable).values({
        ...input,
        dueDate: input.dueDate.toISOString(),
      });
    }),

  edit: privateProcedure
    .input(EditInvoiceParams)
    .mutation(async ({ ctx, input }) => {
      const { dueDate, ...params } = input;

      await ctx.db
        .update(InvoicesTable)
        .set({
          ...params,
          ...(dueDate && { dueDate: dueDate.toISOString() }),
        })
        .where(eq(InvoicesTable.id, input.id));
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(InvoicesTable).where(eq(InvoicesTable.id, input.id));
    }),

  payWithAccountBalance: privateProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const [invoice] = await ctx.db
        .select()
        .from(InvoicesTable)
        .where(eq(InvoicesTable.id, input.id));

      if (!invoice)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Invoice not found',
        });

      await ctx.db.transaction(async (tx) => {
        await tx
          .update(InvoicesTable)
          .set({ paid: true })
          .where(eq(InvoicesTable.id, input.id));

        await tx
          .update(BankAccountsTable)
          .set({
            balance: sql`${BankAccountsTable.balance} - ${invoice.value}`,
          })
          .where(eq(BankAccountsTable.id, invoice.accountId));
      });
    }),
});
