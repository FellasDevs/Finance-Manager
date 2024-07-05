'use client';

import { api } from '~/trpc/react';
import Chart from 'react-apexcharts';
import React, { type ReactNode, useMemo } from 'react';
import { Spinner } from '~/app/_components/ui/spinner';

type Props = {
  invoiceId: string;
};

export function PurchasesGraph({ invoiceId }: Props) {
  const {
    data: categories,
    isPending: categoriesPending,
    error: categoriesError,
  } = api.purchaseCategories.getByUser.useQuery();

  const {
    data: purchases,
    isPending: purchasesPending,
    error: purchaseError,
  } = api.purchases.getByInvoice.useQuery({
    invoiceId,
  });

  const isPending = useMemo(
    () => categoriesPending || purchasesPending,
    [categoriesPending, purchasesPending],
  );

  const error = useMemo(
    () => categoriesError || purchaseError,
    [categoriesError, purchaseError],
  );

  const [valuePurchasedPerCategory, usedCategoriesNames] = useMemo(() => {
    const usedCategoriesIds = [
      ...new Set(purchases?.map((purchase) => purchase.categoryId) || []),
    ];

    const usedCategories =
      categories?.filter((category) =>
        usedCategoriesIds.includes(category.id),
      ) || [];

    const valuePurchasedPerCategory = usedCategories?.map(
      (category) =>
        purchases
          ?.filter((purchase) => purchase.categoryId === category.id)
          .reduce((sum, purchase) => sum + purchase.value, 0) || 0,
    );

    return [
      valuePurchasedPerCategory,
      usedCategories.map((category) => category.name),
    ];
  }, [categories, purchases]);

  return (
    <div className="min-w-[30em] grow rounded-lg p-3 shadow-lg">
      <p className="mb-7 text-2xl font-bold">Compras por categoria</p>

      <div className="flex flex-col">
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
        ) : !valuePurchasedPerCategory.length ? (
          <ErrorMessage>
            Os valores não puderam ser carregados, recarregue a página para
            tentar novamente
          </ErrorMessage>
        ) : (
          <div className="m-auto">
            <Chart
              series={valuePurchasedPerCategory}
              type="pie"
              width={500}
              options={{
                chart: { type: 'pie' },
                labels: usedCategoriesNames,
                legend: { position: 'bottom' },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex items-center gap-2 text-xl font-bold">
      {children}
    </div>
  );
}
