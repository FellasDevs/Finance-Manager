import { createInsertSchema } from 'drizzle-zod';
import { BankAccountsTable } from '~/server/db/schema';
import { z } from '~/utils/zod-pt';

const BaseBankAccountParams = createInsertSchema(BankAccountsTable, {
  name: z.string().min(3).max(50),
  balance: z.number().positive().max(90000),
}).omit({
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const CreateBankAccountParams = BaseBankAccountParams.omit({
  id: true,
});

export const EditBankAccountParams = BaseBankAccountParams.required({
  id: true,
});
