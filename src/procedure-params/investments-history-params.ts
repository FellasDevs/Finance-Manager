import { createInsertSchema } from 'drizzle-zod';
import { InvestmentHistoryTable } from '~/server/db/schema';
import { z } from '~/utils/zod-pt';

const BaseInvestmentUpdateParams = createInsertSchema(InvestmentHistoryTable, {
  investmentId: z.string().uuid(),
  time: z.coerce.date(),
  value: z.number(),
}).omit({
  createdAt: true,
  updatedAt: true,
});

export const CreateInvestmentUpdateParams = BaseInvestmentUpdateParams.omit({
  id: true,
});

export const UpdateInvestmentUpdateParams = BaseInvestmentUpdateParams.partial()
  .omit({ investmentId: true })
  .required({
    id: true,
  });
