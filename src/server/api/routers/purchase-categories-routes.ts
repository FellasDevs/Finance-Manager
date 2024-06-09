import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { PurchaseCategoriesTable } from '~/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { CreatePurchaseCategorySchema } from '~/schemas/purchase-categories.schema';

export const purchaseCategoriesRouter = createTRPCRouter({
  getByUser: privateProcedure.query(({ ctx }) => {
    return ctx.db
      .select()
      .from(PurchaseCategoriesTable)
      .where(eq(PurchaseCategoriesTable.userId, ctx.user.id))
      .orderBy(desc(PurchaseCategoriesTable.createdAt));
  }),

  create: privateProcedure
    .input(CreatePurchaseCategorySchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(PurchaseCategoriesTable).values({
        ...input,
        userId: ctx.user.id,
      });
    }),
});
