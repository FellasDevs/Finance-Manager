import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { BudgetsTable } from '~/server/db/schema';
import { and, eq, sql } from 'drizzle-orm';
import {
  BudgetParams,
  GetBudgetParams,
} from '~/procedure-params/budget-params';
import { z } from '~/utils/zod-pt';

export const budgetsRouter = createTRPCRouter({
  get: privateProcedure.input(GetBudgetParams).query(async ({ ctx, input }) => {
    const [budget] = await ctx.db
      .select()
      .from(BudgetsTable)
      .where(
        and(
          eq(BudgetsTable.invoiceId, input.invoiceId),
          eq(BudgetsTable.categoryId, input.categoryId),
        ),
      );

    return budget;
  }),

  getAllFromInvoice: privateProcedure
    .input(z.object({ invoiceId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(BudgetsTable)
        .where(eq(BudgetsTable.invoiceId, input.invoiceId));
    }),

  create: privateProcedure
    .input(BudgetParams)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(BudgetsTable).values(input);
    }),

  edit: privateProcedure
    .input(BudgetParams)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(BudgetsTable)
        .set({
          value: input.value,
          updatedAt: sql`now()`,
        })
        .where(
          and(
            eq(BudgetsTable.invoiceId, input.invoiceId),
            eq(BudgetsTable.categoryId, input.categoryId),
          ),
        );
    }),

  delete: privateProcedure
    .input(GetBudgetParams)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(BudgetsTable)
        .where(
          and(
            eq(BudgetsTable.invoiceId, input.invoiceId),
            eq(BudgetsTable.categoryId, input.categoryId),
          ),
        );
    }),
});
