'use client';

import { api } from '~/trpc/react';
import { type FC } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import { TransactionCard } from '~/app/(main)/(items)/accounts/[id]/_components/transactions/transaction-card';
import { TransactionForm } from '~/app/(main)/(items)/accounts/[id]/_components/transactions/transaction-form';
import type { PurchaseCategories } from '~/app/(main)/(items)/accounts/[id]/page';

export type TransactionsRouteOutput =
  InferRouteOutput['transactions']['getByAccountId'];

type Props = {
  accountId: string;
  initialTransactions: TransactionsRouteOutput;
  initialCategories: PurchaseCategories;
};

export const TransactionsList: FC<Props> = ({
  accountId,
  initialTransactions,
  initialCategories,
}) => {
  const { data: transactions, error } =
    api.transactions.getByAccountId.useQuery(
      { accountId },
      { initialData: initialTransactions },
    );

  return (
    <div className="flex max-h-[40em] w-[30em] flex-col gap-2 rounded-lg p-5 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="text-2xl font-bold">Transações</div>

        <TransactionForm accountId={accountId} />
      </div>

      <div className="flex flex-col gap-2 overflow-auto p-5">
        {error || !transactions?.length ? (
          <div className="my-10 text-center text-xl font-bold">
            Não há transações
          </div>
        ) : (
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              categories={initialCategories}
            />
          ))
        )}
      </div>
    </div>
  );
};
