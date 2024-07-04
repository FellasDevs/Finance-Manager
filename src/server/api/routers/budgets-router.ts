import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { BudgetsTable } from '~/server/db/schema';
import { and, eq, sql } from 'drizzle-orm';
import {
  CreateBudgetParams,
  GetBudgetParams,
} from '~/procedure-params/create-budget-params';
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

  getByInvoice: privateProcedure
    .input(z.object({ invoiceId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(BudgetsTable)
        .where(eq(BudgetsTable.invoiceId, input.invoiceId));
    }),

  create: privateProcedure
    .input(CreateBudgetParams)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(BudgetsTable).values(input);
    }),

  edit: privateProcedure
    .input(CreateBudgetParams)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(BudgetsTable)
        .set({
          ...input,
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
