import { createInsertSchema } from 'drizzle-zod';
import { InvoicesTable } from '~/server/db/schema';
import { z } from 'zod';

const BaseInvoiceSchema = createInsertSchema(InvoicesTable, {
  value: z.number().positive(),
  lim: z.number().positive(),
  dueDate: z.coerce.date(),
}).omit({
  createdAt: true,
  updatedAt: true,
});

export const CreateInvoiceSchema = BaseInvoiceSchema.omit({ id: true });

export const EditInvoiceSchema = BaseInvoiceSchema.required({ id: true });
