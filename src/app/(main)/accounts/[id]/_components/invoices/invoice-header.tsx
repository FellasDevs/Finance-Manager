import { parseMoney } from '~/utils/parseMoney';
import { type InvoiceCardProps } from '~/app/(main)/accounts/[id]/_components/invoices/invoice-card';

export function InvoiceHeader({ invoice }: InvoiceCardProps) {
  return (
    <div className="flex w-full flex-col items-center [&_div]:flex [&_div]:w-[11rem] [&_div]:justify-between [&_div]:gap-2 [&_div]:truncate [&_div]:font-semibold">
      <p className="mb-2 text-2xl font-bold">
        {new Date(invoice.dueDate).toLocaleDateString(undefined, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>

      <div className="text-xl">
        <p>Fatura</p>
        <p>{parseMoney(invoice.value)}</p>
      </div>

      <div className="text-lg text-gray-700">
        <p>Limite</p>
        <p>{parseMoney(invoice.lim)}</p>
      </div>
    </div>
  );
}
