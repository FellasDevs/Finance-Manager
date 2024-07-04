import { parseMoney } from '~/utils/parseMoney';
import { type InvoiceCardProps } from '~/app/(main)/accounts/[id]/_components/invoices/invoice-card';
import dayjs from 'dayjs';

export function InvoiceHeader({ invoice }: InvoiceCardProps) {
  const dueDateApproaching = dayjs(invoice.dueDate).isBefore(
    dayjs().add(3, 'days'),
  );

  const expired = dayjs(invoice.dueDate).isBefore(dayjs());

  return (
    <div>
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

      <div className="mt-1 text-center text-lg font-semibold">
        {invoice.paid ? (
          <p className="text-green-500">Fatura paga</p>
        ) : expired ? (
          <p className="text-red-500">Fatura vencida</p>
        ) : dueDateApproaching ? (
          <p className="text-yellow-500">
            Vencendo em {dayjs(invoice.dueDate).diff(dayjs(), 'days')} dia(s)
          </p>
        ) : (
          <p className="text-blue-500">
            A vencer em {dayjs(invoice.dueDate).diff(dayjs(), 'days')} dia(s)
          </p>
        )}
      </div>
    </div>
  );
}
