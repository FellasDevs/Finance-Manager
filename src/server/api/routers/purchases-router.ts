import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { PurchasesTable } from '~/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { z } from '~/utils/zod-pt';
import { CreatePurchaseSchema } from '~/schemas/purchases.schema';

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
    .input(CreatePurchaseSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(PurchasesTable).values(input);
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(PurchasesTable)
        .where(eq(PurchasesTable.id, input.id));
    }),
});
