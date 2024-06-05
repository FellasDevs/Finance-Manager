import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { InvoicesTable } from '~/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const CreateInvoiceSchema = createInsertSchema(InvoicesTable).omit({
  id: true,
});

export const invoicesRouter = createTRPCRouter({
  getByAccountId: privateProcedure
    .input(z.object({ accountId: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(InvoicesTable)
        .where(eq(InvoicesTable.accountId, input.accountId))
        .orderBy(desc(InvoicesTable.dueDate));
    }),

  getById: privateProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(InvoicesTable)
        .where(eq(InvoicesTable.id, input.id));
    }),

  create: privateProcedure
    .input(CreateInvoiceSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(InvoicesTable).values(input);
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(InvoicesTable).where(eq(InvoicesTable.id, input.id));
    }),
});
