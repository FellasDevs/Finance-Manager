'use client';

import { type InferRouteOutput } from '~/utils/types';
import { useMemo } from 'react';
import { parseMoney } from '~/utils/parseMoney';
import { api } from '~/trpc/react';
import { Button } from '~/app/_components/ui/button';
import { FaTrash } from 'react-icons/fa';
import { PurchaseForm } from '~/app/(main)/accounts/[id]/_components/purchases/purchase-form';

export type Purchase = InferRouteOutput['purchases']['getByInvoice'][0];

type Props = {
  purchase: Purchase;
};

export function PurchaseCard({ purchase }: Props) {
  const { data: categories } = api.purchaseCategories.getByUser.useQuery();

  const { mutate: deletePurchase, isPending } =
    api.purchases.delete.useMutation();

  const category = useMemo(
    () => categories?.find((category) => category.id === purchase.categoryId),
    [categories, purchase.categoryId],
  );

  return (
    <div className="flex items-center justify-between rounded-lg p-3 shadow-lg">
      <div>
        <p className="mb-1 text-xl font-bold">{parseMoney(purchase.value)}</p>
        <p className="truncate text-lg font-semibold">{purchase.description}</p>
        <p>
          Categoria: <b>{category?.name}</b>
        </p>
      </div>

      <div>
        <PurchaseForm
          invoiceId={purchase.invoiceId}
          createdPurchase={purchase}
        />

        <Button
          onClick={() => deletePurchase({ id: purchase.id })}
          disabled={isPending}
          variant="ghost"
          size="icon"
        >
          <FaTrash size={20} color="red" />
        </Button>
      </div>
    </div>
  );
}
