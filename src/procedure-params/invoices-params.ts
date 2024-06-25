import { createInsertSchema } from 'drizzle-zod';
import { InvoicesTable } from '~/server/db/schema';
import { z } from '~/utils/zod-pt';

const BaseInvoiceParams = createInsertSchema(InvoicesTable, {
  value: z.number().positive(),
  lim: z.number().positive(),
  dueDate: z.coerce.date(),
}).omit({
  createdAt: true,
  updatedAt: true,
});

export const CreateInvoiceParams = BaseInvoiceParams.omit({ id: true });

export const EditInvoiceParams = BaseInvoiceParams.required({ id: true });
