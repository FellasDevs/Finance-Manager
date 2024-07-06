'use client';

import { api } from '~/trpc/react';
import { Spinner } from '~/app/_components/ui/spinner';
import Chart from 'react-apexcharts';
import React, { type ReactNode, useMemo } from 'react';
import { type TransactionsRouteOutput } from '~/app/(main)/(items)/accounts/[id]/_components/transactions/transaction-list';
import { parseMoney } from '~/utils/parseMoney';
import { type PurchaseCategories } from '~/app/(main)/(items)/accounts/[id]/page';

type Props = {
  accountId: string;
  initialTransactions: TransactionsRouteOutput;
  initialCategories: PurchaseCategories;
};

export function TransactionsGraph({
  accountId,
  initialTransactions,
  initialCategories,
}: Props) {
  const {
    data: categories,
    isPending: categoriesPending,
    error: categoriesError,
  } = api.purchaseCategories.getByUser.useQuery(undefined, {
    initialData: initialCategories,
  });

  const {
    data: transactions,
    error: transactionsError,
    isPending: transactionsPending,
  } = api.transactions.getByAccountId.useQuery(
    { accountId },
    { initialData: initialTransactions },
  );

  const isPending = useMemo(
    () => categoriesPending || transactionsPending,
    [categoriesPending, transactionsPending],
  );

  const error = useMemo(
    () => categoriesError || transactionsError,
    [categoriesError, transactionsError],
  );

  const [series, usedCategoriesNames] = useMemo(() => {
    const usedCategoriesIds = [
      ...new Set(
        transactions?.map((transaction) => transaction.categoryId) || [],
      ),
    ];

    const usedCategories =
      categories?.filter((category) =>
        usedCategoriesIds.includes(category.id),
      ) || [];

    const valueSpentPerCategory = usedCategories?.map(
      (category) =>
        transactions
          ?.filter((transaction) => transaction.categoryId === category.id)
          .reduce((sum, transaction) => sum + transaction.value, 0) || 0,
    );

    return [
      [
        {
          name: 'Transações',
          data: valueSpentPerCategory,
        },
      ],
      usedCategories.map((category) => category.name),
    ];
  }, [categories, transactions]);

  return (
    <div className="flex min-w-[30em] grow flex-col rounded-lg p-3 shadow-lg">
      <p className="mb-7 text-2xl font-bold">Transações por categoria</p>

      <div className="m-auto">
        {isPending ? (
          <ErrorMessage>
            <Spinner />
            <p>Carregando...</p>
          </ErrorMessage>
        ) : error ? (
          <ErrorMessage>
            Ocorreu um erro inesperado, recarregue a página para tentar
            novamente
          </ErrorMessage>
        ) : !transactions.length ? (
          <ErrorMessage>Não há transações</ErrorMessage>
        ) : (
          <Chart
            type="bar"
            width={800}
            height={500}
            series={series}
            options={{
              yaxis: {
                title: {
                  text: 'Valor gasto por categoria',
                },
                labels: {
                  formatter: function (y) {
                    return parseMoney(y);
                  },
                },
              },
              xaxis: {
                title: {
                  text: 'Categorias',
                },
                categories: usedCategoriesNames,
                labels: {
                  rotate: -90,
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-xl font-bold">{children}</div>
  );
}
