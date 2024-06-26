import { createInsertSchema } from 'drizzle-zod';
import { BudgetsTable } from '~/server/db/schema';
import { z } from '~/utils/zod-pt';

export const BudgetParams = createInsertSchema(BudgetsTable, {
  value: z.number().positive(),
  invoiceId: z.string().uuid(),
  categoryId: z.string().uuid(),
}).omit({
  createdAt: true,
  updatedAt: true,
});

export const GetBudgetParams = BudgetParams.omit({ value: true });
