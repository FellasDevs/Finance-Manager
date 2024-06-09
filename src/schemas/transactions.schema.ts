import { createInsertSchema } from 'drizzle-zod';
import { TransactionsTable } from '~/server/db/schema';
import { z } from '~/utils/zod-pt';

const BaseTransactionSchema = createInsertSchema(TransactionsTable, {
  description: z.string().min(3).max(50),
  value: z.number().positive(),
  category: z.string().uuid(),
  time: z.coerce.date(),
}).omit({
  createdAt: true,
  updatedAt: true,
});

export const CreateTransactionSchema = BaseTransactionSchema.omit({ id: true });

export const EditTransactionSchema = BaseTransactionSchema.required({
  id: true,
});
