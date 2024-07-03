import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { InvestmentHistoryTable } from '~/server/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import { z } from '~/utils/zod-pt';
import {
  CreateInvestmentUpdateParams,
  UpdateInvestmentUpdateParams,
} from '~/procedure-params/investments-history-params';

export const investmentsHistoryRouter = createTRPCRouter({
  getAllByInvestment: privateProcedure
    .input(z.object({ investmentId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(InvestmentHistoryTable)
        .where(eq(InvestmentHistoryTable.investmentId, input.investmentId))
        .orderBy(desc(InvestmentHistoryTable.time));
    }),

  create: privateProcedure
    .input(CreateInvestmentUpdateParams)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(InvestmentHistoryTable).values(input);
    }),

  update: privateProcedure
    .input(UpdateInvestmentUpdateParams)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(InvestmentHistoryTable)
        .set({
          ...input,
          updatedAt: sql`now()`,
        })
        .where(eq(InvestmentHistoryTable.id, input.id));
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(InvestmentHistoryTable)
        .where(eq(InvestmentHistoryTable.id, input.id));
    }),
});
