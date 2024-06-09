import { createInsertSchema } from 'drizzle-zod';
import { BankAccountsTable } from '~/server/db/schema';
import { z } from '~/utils/zod-pt';

const BaseBankAccountSchema = createInsertSchema(BankAccountsTable, {
  name: z.string().min(3).max(50),
  balance: z.number().positive().max(90000),
}).omit({
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const CreateBankAccountSchema = BaseBankAccountSchema.omit({
  id: true,
});

export const EditBankAccountSchema = BaseBankAccountSchema.required({
  id: true,
});
