import { createInsertSchema } from 'drizzle-zod';
import { InvestmentHistoryTable } from '~/server/db/schema';
import { z } from '~/utils/zod-pt';

const BaseInvestmentChangeParams = createInsertSchema(InvestmentHistoryTable, {
  investmentId: z.string().uuid(),
  time: z.coerce.date(),
  value: z.number().nonnegative(),
}).omit({
  createdAt: true,
  updatedAt: true,
});

export const CreateInvestmentChangeParams = BaseInvestmentChangeParams.omit({
  id: true,
});

export const UpdateInvestmentChangeParams = BaseInvestmentChangeParams.partial()
  .omit({ investmentId: true })
  .required({
    id: true,
  });
