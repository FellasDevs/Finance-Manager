import { createInsertSchema } from 'drizzle-zod';
import { PurchaseCategoriesTable } from '~/server/db/schema';
import { z } from 'zod';

const BasePurchaseCategorySchema = createInsertSchema(PurchaseCategoriesTable, {
  name: z.string().min(3).max(50),
}).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const CreatePurchaseCategorySchema = BasePurchaseCategorySchema;
