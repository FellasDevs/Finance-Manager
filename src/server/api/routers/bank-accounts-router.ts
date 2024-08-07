import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { BankAccountsTable } from '~/server/db/schema';
import { and, desc, eq, sql } from 'drizzle-orm';
import {
  CreateBankAccountParams,
  EditBankAccountParams,
} from '~/procedure-params/bank-account-params';
import { z } from '~/utils/zod-pt';

export const bankAccountsRouter = createTRPCRouter({
  getByUser: privateProcedure.query(({ ctx }) => {
    return ctx.db
      .select()
      .from(BankAccountsTable)
      .where(eq(BankAccountsTable.userId, ctx.user.id))
      .orderBy(desc(BankAccountsTable.updatedAt));
  }),

  getById: privateProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [account] = await ctx.db
        .select()
        .from(BankAccountsTable)
        .where(eq(BankAccountsTable.id, input.id));

      return account;
    }),

  create: privateProcedure
    .input(CreateBankAccountParams)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(BankAccountsTable).values({
        ...input,
        userId: ctx.user.id,
      });
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(BankAccountsTable)
        .where(
          and(
            eq(BankAccountsTable.id, input.id),
            eq(BankAccountsTable.userId, ctx.user.id),
          ),
        );
    }),

  edit: privateProcedure
    .input(EditBankAccountParams)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(BankAccountsTable)
        .set({
          name: input.name,
          balance: input.balance,
          updatedAt: sql`now()`,
        })
        .where(
          and(
            eq(BankAccountsTable.id, input.id),
            eq(BankAccountsTable.userId, ctx.user.id),
          ),
        );
    }),
});
