import { parseMoney } from '~/utils/parseMoney';
import { type Invoice } from '~/app/(main)/(items)/accounts/[id]/_components/invoices/invoice-card';
import dayjs from 'dayjs';
import { InvoiceForm } from '~/app/(main)/(items)/accounts/[id]/_components/invoices/invoice-form';

type Props = {
  invoice: Invoice;
  fromDialog?: boolean;
};

export function InvoiceHeader({ invoice, fromDialog }: Props) {
  const dueDateApproaching = dayjs(invoice.dueDate).isBefore(
    dayjs().add(8, 'days'),
  );

  const expired = dayjs(invoice.dueDate).isBefore(dayjs());

  return (
    <div className="flex justify-center gap-5">
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

          <div className="text-lg text-muted-foreground">
            <p>Limite</p>
            <p>{parseMoney(invoice.lim)}</p>
          </div>
        </div>

        <div className="mt-1 text-center text-lg font-semibold">
          {invoice.paid ? (
            <p className="text-green-500">Fatura paga</p>
          ) : expired ? (
            <p className="text-red-500">Fatura vencida</p>
          ) : (
            <p
              className={
                dueDateApproaching ? 'text-yellow-500' : 'text-blue-500'
              }
            >
              Vencerá em {dayjs(invoice.dueDate).diff(dayjs(), 'days')} dia(s)
            </p>
          )}
        </div>
      </div>

      {fromDialog && (
        <InvoiceForm accountId={invoice.accountId} createdInvoice={invoice} />
      )}
    </div>
  );
}
