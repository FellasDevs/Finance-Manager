import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { BankAccountsTable } from '~/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

const CreateBankAccountSchema = createInsertSchema(BankAccountsTable).omit({
  id: true,
});

const EditBankAccountSchema = createInsertSchema(BankAccountsTable)
  .omit({
    userId: true,
  })
  .required({
    id: true,
  });

export const bankAccountsRouter = createTRPCRouter({
  getByUserId: publicProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(BankAccountsTable)
        .where(eq(BankAccountsTable.userId, input.userId))
        .orderBy(desc(BankAccountsTable.balance));
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

  delete: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(BankAccountsTable)
        .where(eq(BankAccountsTable.id, input.id));
    }),

  edit: publicProcedure
    .input(EditBankAccountSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(BankAccountsTable)
        .set({
          name: input.name,
          balance: input.balance,
        })
        .where(eq(BankAccountsTable.id, input.id));
    }),
});
