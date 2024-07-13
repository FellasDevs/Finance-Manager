'use client';

import { TransactionsList } from '~/app/(main)/(items)/accounts/[id]/_components/transactions/transaction-list';
import { TransactionsGraph } from '~/app/(main)/(items)/accounts/[id]/_components/transactions/transactions-graph';
import { Card } from '~/app/_components/ui/card';
import type { InferRouteOutput } from '~/utils/types';
import type { PurchaseCategories } from '~/app/(main)/(items)/accounts/[id]/page';
import { api } from '~/trpc/react';
import { TransactionForm } from '~/app/(main)/(items)/accounts/[id]/_components/transactions/transaction-form';
import React, { type ReactNode, useMemo } from 'react';
import { Spinner } from '~/app/_components/ui/spinner';

export type TransactionsRouteOutput =
  InferRouteOutput['transactions']['getByAccountId'];

type Props = {
  accountId: string;
  initialTransactions: TransactionsRouteOutput;
  initialCategories: PurchaseCategories;
};

export function TransactionsContainer({
  initialTransactions,
  initialCategories,
  accountId,
}: Props) {
  const {
    data: transactions,
    error: transactionsError,
    isPending: transactionsPending,
  } = api.transactions.getByAccountId.useQuery(
    { accountId },
    { initialData: initialTransactions },
  );

  const {
    data: categories,
    isPending: categoriesPending,
    error: categoriesError,
  } = api.purchaseCategories.getByUser.useQuery(undefined, {
    initialData: initialCategories,
  });

  const error = useMemo(
    () => transactionsError || categoriesError,
    [transactionsError, categoriesError],
  );

  const isPending = useMemo(
    () => transactionsPending || categoriesPending,
    [transactionsPending, categoriesPending],
  );

  if (isPending)
    return (
      <ErrorMessage>
        <Spinner />
        <p>Carregando...</p>
      </ErrorMessage>
    );

  if (error)
    return (
      <ErrorMessage>
        Ocorreu um erro inesperado, recarregue a página para tentar novamente
      </ErrorMessage>
    );

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center gap-4">
        <div className="text-2xl font-bold">Transações</div>

        <TransactionForm accountId={accountId} />
      </div>

      {!transactions.length ? (
        <ErrorMessage>Não há transações</ErrorMessage>
      ) : (
        <div className="flex flex-col gap-4 lg:flex-row">
          <TransactionsList
            transactions={transactions}
            categories={initialCategories}
          />

          <TransactionsGraph
            transactions={transactions}
            categories={categories}
          />
        </div>
      )}
    </Card>
  );
}

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-xl font-bold">{children}</div>
  );
}
