import { createInsertSchema } from 'drizzle-zod';
import { PurchaseCategoriesTable } from '~/server/db/schema';
import { z } from '~/utils/zod-pt';

const BasePurchaseCategoryParams = createInsertSchema(PurchaseCategoriesTable, {
  name: z.string().min(3).max(50),
}).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const CreatePurchaseCategoryParams = BasePurchaseCategoryParams;
