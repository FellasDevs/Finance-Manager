'use client';

import { api } from '~/trpc/react';
import { type FC } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import { TransactionCard } from '~/app/(main)/accounts/[id]/_components/transactions/transaction-card';
import { TransactionForm } from '~/app/(main)/accounts/[id]/_components/transactions/transaction-form';

type Props = {
  accountId: string;
  initialData: InferRouteOutput['transactions']['getByAccountId'];
};

export const TransactionsList: FC<Props> = ({ accountId, initialData }) => {
  const { data: transactions, error } =
    api.transactions.getByAccountId.useQuery({ accountId }, { initialData });

  return (
    <div className="flex h-[28em] w-[30em] flex-col gap-2 rounded p-5 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="text-2xl font-bold">TRANSAÇÕES</div>

        <TransactionForm accountId={accountId} />
      </div>

      <div className="flex flex-col gap-2 overflow-auto p-5">
        {error || !transactions?.length ? (
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
