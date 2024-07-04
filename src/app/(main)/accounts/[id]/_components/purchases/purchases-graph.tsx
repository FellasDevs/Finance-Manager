import { api } from '~/trpc/react';
import Chart from 'react-apexcharts';
import { useMemo } from 'react';

type Props = {
  invoiceId: string;
};

export function PurchasesGraph({ invoiceId }: Props) {
  const { data: categories } = api.purchaseCategories.getByUser.useQuery();

  const { data: purchases } = api.purchases.getByInvoice.useQuery({
    invoiceId,
  });

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
    <div className="flex grow flex-col rounded-lg p-3 shadow-lg">
      <p className="text-2xl font-bold">Compras por categoria</p>

      <div className="my-auto">
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
    </div>
  );
}
