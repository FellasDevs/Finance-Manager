import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { BankAccountsTable } from '~/server/db/schema';
import { eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const CreateBankAccountSchema = createInsertSchema(
  BankAccountsTable,
).omit({
  id: true,
});

export const bankAccountsRouter = createTRPCRouter({
  getByUserId: publicProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(BankAccountsTable)
        .where(eq(BankAccountsTable.userId, input.userId));
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const accounts = await ctx.db
        .select()
        .from(BankAccountsTable)
        .where(eq(BankAccountsTable.id, input.id))
        .execute();

      return accounts[0];
    }),

  create: publicProcedure
    .input(CreateBankAccountSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(BankAccountsTable).values(input);
    }),
});
