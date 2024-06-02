import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { BankAccountsTable } from '~/server/db/schema';
import { and, desc, eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

const CreateBankAccountSchema = createInsertSchema(BankAccountsTable).omit({
  id: true,
  userId: true,
});

const EditBankAccountSchema = createInsertSchema(BankAccountsTable)
  .omit({
    userId: true,
  })
  .required({
    id: true,
  });

export const bankAccountsRouter = createTRPCRouter({
  getByUser: privateProcedure.query(({ ctx }) => {
    return ctx.db
      .select()
      .from(BankAccountsTable)
      .where(eq(BankAccountsTable.userId, ctx.user.id))
      .orderBy(desc(BankAccountsTable.balance));
  }),

  getById: privateProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [account] = await ctx.db
        .select()
        .from(BankAccountsTable)
        .where(
          and(
            eq(BankAccountsTable.id, input.id),
            eq(BankAccountsTable.userId, ctx.user.id),
          ),
        );

      return account;
    }),

  create: privateProcedure
    .input(CreateBankAccountSchema)
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
    .input(EditBankAccountSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(BankAccountsTable)
        .set({
          name: input.name,
          balance: input.balance,
        })
        .where(
          and(
            eq(BankAccountsTable.id, input.id),
            eq(BankAccountsTable.userId, ctx.user.id),
          ),
        );
    }),
});
