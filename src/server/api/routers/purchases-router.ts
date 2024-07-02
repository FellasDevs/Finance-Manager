import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { InvoicesTable, PurchasesTable } from '~/server/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import { z } from '~/utils/zod-pt';
import { CreatePurchaseParams } from '~/procedure-params/purchases-params';
import { TRPCError } from '@trpc/server';

export const PurchasesRouter = createTRPCRouter({
  getByInvoice: privateProcedure
    .input(z.object({ invoiceId: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(PurchasesTable)
        .where(eq(PurchasesTable.invoiceId, input.invoiceId))
        .orderBy(desc(PurchasesTable.createdAt));
    }),

  create: privateProcedure
    .input(CreatePurchaseParams)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx.insert(PurchasesTable).values(input);

        await tx
          .update(InvoicesTable)
          .set({
            value: sql`${InvoicesTable.value} + ${input.value}`,
            updatedAt: sql`now()`,
          })
          // @ts-expect-error Erro nada a ver, ignorar isso
          .where(eq(input.invoiceId, InvoicesTable.id));
      });
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const [purchase] = await ctx.db
        .select()
        .from(PurchasesTable)
        .where(eq(PurchasesTable.id, input.id));

      if (!purchase)
        throw new TRPCError({
          code: 'NOT_FOUND',
        });

      await ctx.db.transaction(async (tx) => {
        await tx
          .update(InvoicesTable)
          .set({
            value: sql`${InvoicesTable.value} - ${purchase.value}`,
            updatedAt: sql`now()`,
          })
          .where(eq(InvoicesTable.id, purchase.invoiceId));

        await tx.delete(PurchasesTable).where(eq(PurchasesTable.id, input.id));
      });
    }),
});
