import { z } from '~/utils/zod-pt';
import { createInsertSchema } from 'drizzle-zod';
import { InvestmentsTable } from '~/server/db/schema';

const BaseInvestmentParams = createInsertSchema(InvestmentsTable, {
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string().min(1).max(50),
  value: z.number().nonnegative(),
}).omit({
  createdAt: true,
  updatedAt: true,
});

export const CreateInvestmentParams = BaseInvestmentParams.omit({ id: true });

export const UpdateInvestmentParams = BaseInvestmentParams.partial().required({
  id: true,
});
