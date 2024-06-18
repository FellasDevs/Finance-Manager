import { type FC } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import { parseMoney } from '~/utils/parseMoney';
import { InvoiceDialog } from '~/app/(main)/accounts/[id]/_components/invoices/invoice-dialog';

export type InvoiceCardProps = {
  invoice: InferRouteOutput['invoices']['getByAccountId'][0];
};

export const InvoiceCard: FC<InvoiceCardProps> = ({ invoice }) => {
  return (
    <div className="flex h-[12em] flex-col justify-between rounded-lg p-3 font-semibold shadow-lg">
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

      <InvoiceDialog invoice={invoice} />
    </div>
  );
};
