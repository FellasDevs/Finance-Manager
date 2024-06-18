import { createInsertSchema } from 'drizzle-zod';
import { PurchasesTable } from '~/server/db/schema';
import { z } from '~/utils/zod-pt';

const BasePurchaseSchema = createInsertSchema(PurchasesTable, {
  description: z.string().min(3).max(50),
  value: z.number().positive(),
  invoiceId: z.string().uuid(),
  categoryId: z.string().uuid(),
  time: z.coerce.date(),
}).omit({
  createdAt: true,
  updatedAt: true,
});

export const CreatePurchaseSchema = BasePurchaseSchema.omit({ id: true });
