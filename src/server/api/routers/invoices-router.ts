import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { InvoicesTable } from '~/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { CreateInvoiceParams } from '~/procedure-params/invoices-params';
import { z } from '~/utils/zod-pt';

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

  delete: privateProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(InvoicesTable).where(eq(InvoicesTable.id, input.id));
    }),
});
