import { parseMoney } from '~/utils/parseMoney';
import { type InvoiceCardProps } from '~/app/(main)/accounts/[id]/_components/invoices/invoice-card';

export function InvoiceHeader({ invoice }: InvoiceCardProps) {
  return (
    <div className="mx-auto">
      <p className="mb-2 text-xl font-bold">
        {new Date(invoice.dueDate).toLocaleDateString(undefined, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>

      <p className="text-end text-xl font-semibold">
        Fatura: {parseMoney(invoice.value)}
      </p>

      <p className="text-end text-lg text-gray-700">
        Limite de {parseMoney(invoice.lim)}
      </p>
    </div>
  );
}
