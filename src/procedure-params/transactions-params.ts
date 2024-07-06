import { createInsertSchema } from 'drizzle-zod';
import { TransactionsTable } from '~/server/db/schema';
import { z } from '~/utils/zod-pt';

const BaseTransactionParams = createInsertSchema(TransactionsTable, {
  description: z.string().min(3).max(50),
  value: z.number(),
  categoryId: z.string().uuid(),
  time: z.coerce.date(),
}).omit({
  createdAt: true,
  updatedAt: true,
});

export const CreateTransactionParams = BaseTransactionParams.omit({ id: true });
