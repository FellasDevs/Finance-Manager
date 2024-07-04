import { PurchaseForm } from '~/app/(main)/accounts/[id]/_components/purchases/purchase-form';
import { PurchaseCard } from '~/app/(main)/accounts/[id]/_components/purchases/purchase-card';
import React from 'react';
import { api } from '~/trpc/react';

type Props = {
  invoiceId: string;
};

export function PurchaseList({ invoiceId }: Props) {
  const { data: purchases, error } = api.purchases.getByInvoice.useQuery({
    invoiceId,
  });

  return (
    <div className=" max-w-[28em] grow grow rounded-lg p-3 shadow-lg">
      <div className="mb-3 flex justify-between">
        <p className="text-2xl font-bold">Compras</p>

        <PurchaseForm invoiceId={invoiceId} />
      </div>

      {error || !purchases?.length ? (
        'Não há compras registradas nessa fatura'
      ) : (
        <div className="flex max-h-[85%] flex-col gap-2 overflow-auto rounded-lg p-2">
          {purchases.map((purchase) => (
            <PurchaseCard purchase={purchase} key={purchase.id} />
          ))}
        </div>
      )}
    </div>
  );
}
