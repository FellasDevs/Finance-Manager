'use client';

import { Spinner } from '~/app/_components/ui/spinner';
import { api } from '~/trpc/react';
import { type FC } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import { TransactionCard } from '~/app/(main)/accounts/[id]/_components/transaction-card';

type Props = {
  accountId: string;
  initialData: InferRouteOutput['transactions']['getByAccountId'];
};

export const TransactionsList: FC<Props> = ({ accountId, initialData }) => {
  const {
    data: transactions,
    error,
    isPending,
  } = api.transactions.getByAccountId.useQuery({ accountId }, { initialData });

  return (
    <div className="w-[30em] rounded p-5 shadow-lg">
      <div className="m-3 text-2xl font-bold">Transações</div>

      <div className="flex max-h-[80vh] flex-col gap-2 overflow-auto p-5">
        {isPending ? (
          <div>
            Carregando...
            <Spinner />
          </div>
        ) : !!error || !transactions?.length ? (
          <div className="my-10 text-center text-xl font-bold">
            Não há transações
          </div>
        ) : (
          transactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
    </div>
  );
};
