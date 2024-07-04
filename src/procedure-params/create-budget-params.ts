import { createInsertSchema } from 'drizzle-zod';
import { BudgetsTable } from '~/server/db/schema';
import { z } from '~/utils/zod-pt';

export const CreateBudgetParams = createInsertSchema(BudgetsTable, {
  value: z.number().nonnegative(),
  invoiceId: z.string().uuid(),
  categoryId: z.string().uuid(),
}).omit({
  createdAt: true,
  updatedAt: true,
});

export const GetBudgetParams = CreateBudgetParams.omit({ value: true });
