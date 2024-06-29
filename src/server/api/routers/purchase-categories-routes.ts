import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { PurchaseCategoriesTable } from '~/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { CreatePurchaseCategoryParams } from '~/procedure-params/purchase-categories-params';

export const purchaseCategoriesRouter = createTRPCRouter({
  getByUser: privateProcedure.query(({ ctx }) => {
    return ctx.db
      .select()
      .from(PurchaseCategoriesTable)
      .where(eq(PurchaseCategoriesTable.userId, ctx.user.id))
      .orderBy(desc(PurchaseCategoriesTable.createdAt));
  }),

  create: privateProcedure
    .input(CreatePurchaseCategoryParams)
    .mutation(async ({ ctx, input }) => {
      const [newCategory] = await ctx.db
        .insert(PurchaseCategoriesTable)
        .values({
          ...input,
          userId: ctx.user.id,
        })
        .returning();

      return newCategory;
    }),
});
