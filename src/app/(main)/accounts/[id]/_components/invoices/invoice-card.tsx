import { type FC } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import { InvoiceDialog } from '~/app/(main)/accounts/[id]/_components/invoices/invoice-dialog';
import { InvoiceHeader } from '~/app/(main)/accounts/[id]/_components/invoices/invoice-header';

export type InvoiceCardProps = {
  invoice: InferRouteOutput['invoices']['getByAccountId'][0];
};

export const InvoiceCard: FC<InvoiceCardProps> = ({ invoice }) => {
  return (
    <div className="flex h-[12em] flex-col justify-between rounded-lg p-3 font-semibold shadow-lg">
      <InvoiceHeader invoice={invoice} />

      <InvoiceDialog invoice={invoice} />
    </div>
  );
};
