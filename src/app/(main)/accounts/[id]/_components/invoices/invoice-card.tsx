import { type FC } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import { InvoiceDialog } from '~/app/(main)/accounts/[id]/_components/invoices/invoice-dialog';
import { InvoiceHeader } from '~/app/(main)/accounts/[id]/_components/invoices/invoice-header';

export type Invoice = InferRouteOutput['invoices']['getByAccountId'][0];

type InvoiceCardProps = {
  invoice: Invoice;
};

export const InvoiceCard: FC<InvoiceCardProps> = ({ invoice }) => {
  return (
    <div className="flex max-h-[20em] flex-col justify-between gap-3 rounded-lg p-3 font-semibold shadow-lg">
      <InvoiceHeader invoice={invoice} />
      <InvoiceDialog invoice={invoice} />
    </div>
  );
};
