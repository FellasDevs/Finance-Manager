import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { InvestmentHistoryTable, InvestmentsTable } from '~/server/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import { z } from '~/utils/zod-pt';
import { UpdateInvestmentParams } from '~/procedure-params/investments-params';
import { CreateInvestmentChangeParams } from '~/procedure-params/investments-history-params';
import { TRPCError } from '@trpc/server';

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
    .input(CreateInvestmentChangeParams)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx.insert(InvestmentHistoryTable).values(input);

        await tx
          .update(InvestmentsTable)
          .set({
            value: sql`${InvestmentsTable.value} + ${input.value}`,
            updatedAt: sql`now()`,
          })
          .where(eq(InvestmentsTable.id, input.investmentId));
      });
    }),

  update: privateProcedure
    .input(UpdateInvestmentParams)
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
      const [investmentChange] = await ctx.db
        .select()
        .from(InvestmentHistoryTable)
        .where(eq(InvestmentHistoryTable.id, input.id));

      if (!investmentChange)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Investment change not found',
        });

      await ctx.db.transaction(async (tx) => {
        await tx
          .update(InvestmentsTable)
          .set({
            value: sql`${InvestmentsTable.value} - ${investmentChange.value}`,
            updatedAt: sql`now()`,
          })
          .where(eq(InvestmentsTable.id, investmentChange.investmentId));

        await tx
          .delete(InvestmentHistoryTable)
          .where(eq(InvestmentHistoryTable.id, input.id));
      });
    }),
});
