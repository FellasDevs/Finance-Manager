'use client';

import Chart from 'react-apexcharts';
import React, { useMemo } from 'react';
import { parseMoney } from '~/utils/parseMoney';
import { type PurchaseCategories } from '~/app/(main)/(items)/accounts/[id]/page';
import { type TransactionsRouteOutput } from '~/app/(main)/(items)/accounts/[id]/_components/transactions/transactions-container';
import { Card } from '~/app/_components/ui/card';

type Props = {
  transactions: TransactionsRouteOutput;
  categories: PurchaseCategories;
};

export function TransactionsGraph({ transactions, categories }: Props) {
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
    <Card className="flex min-w-[30em] grow flex-col p-3">
      <p className="mb-7 text-2xl font-bold">Transações por categoria</p>

      <div className="m-auto text-black">
        <Chart
          type="bar"
          width={800}
          height={400}
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
      </div>
    </Card>
  );
}
