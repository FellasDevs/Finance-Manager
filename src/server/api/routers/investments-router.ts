import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { InvestmentsTable } from '~/server/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import { z } from '~/utils/zod-pt';
import {
  CreateInvestmentParams,
  UpdateInvestmentParams,
} from '~/procedure-params/investments-params';

export const investmentsRouter = createTRPCRouter({
  getAllByUser: privateProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(InvestmentsTable)
      .where(eq(InvestmentsTable.userId, ctx.user.id))
      .orderBy(desc(InvestmentsTable.createdAt));
  }),

  getById: privateProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [investment] = await ctx.db
        .select()
        .from(InvestmentsTable)
        .where(eq(InvestmentsTable.id, input.id));

      return investment;
    }),

  create: privateProcedure
    .input(CreateInvestmentParams)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(InvestmentsTable).values({
        ...input,
        userId: ctx.user.id,
      });
    }),

  update: privateProcedure
    .input(UpdateInvestmentParams)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(InvestmentsTable)
        .set({
          ...input,
          updatedAt: sql`now()`,
        })
        .where(eq(InvestmentsTable.id, input.id));
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(InvestmentsTable)
        .where(eq(InvestmentsTable.id, input.id));
    }),
});
