'use client';

import { Spinner } from '~/app/_components/ui/spinner';
import { api } from '~/trpc/react';
import { type FC } from 'react';
import { type InferRouteOutput } from '~/utils/types';

type Props = {
  accountId: string;
  initialData: InferRouteOutput['invoices']['getByAccountId'];
};

export const InvoicesList: FC<Props> = ({ accountId, initialData }) => {
  const {
    data: invoices,
    error,
    isPending,
  } = api.invoices.getByAccountId.useQuery({ accountId }, { initialData });

  return (
    <div className="w-[30em] rounded p-5 shadow-lg">
      <div className="m-3 text-2xl font-bold">Faturas</div>

      <div className="flex max-h-[80vh] flex-col gap-2 overflow-auto p-5">
        {isPending ? (
          <div>
            Carregando...
            <Spinner />
          </div>
        ) : !!error || !invoices?.length ? (
          <div className="my-10 text-center text-xl font-bold">
            Não há faturas
          </div>
        ) : (
          invoices.map((invoice) => (
            <div key={invoice.id} className="rounded border p-1">
              {invoice.value}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
