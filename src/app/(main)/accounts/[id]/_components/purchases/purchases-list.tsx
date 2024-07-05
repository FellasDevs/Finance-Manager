'use client';

import { PurchaseForm } from '~/app/(main)/accounts/[id]/_components/purchases/purchase-form';
import { PurchaseCard } from '~/app/(main)/accounts/[id]/_components/purchases/purchase-card';
import React, { type ReactNode } from 'react';
import { api } from '~/trpc/react';
import { Spinner } from '~/app/_components/ui/spinner';

type Props = {
  invoiceId: string;
};

export function PurchasesList({ invoiceId }: Props) {
  const {
    data: purchases,
    error,
    isPending,
  } = api.purchases.getByInvoice.useQuery({
    invoiceId,
  });

  return (
    <div className="min-h-[30em] min-w-[25em] grow rounded-lg p-3 shadow-lg">
      <div className="mb-3 flex justify-between">
        <p className="text-2xl font-bold">Compras</p>

        <PurchaseForm invoiceId={invoiceId} />
      </div>

      <div className="flex max-h-[85%] flex-col gap-2 overflow-auto p-2">
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
        ) : !purchases?.length ? (
          <ErrorMessage>Não há compras registradas nessa fatura</ErrorMessage>
        ) : (
          <>
            {purchases.map((purchase) => (
              <PurchaseCard purchase={purchase} key={purchase.id} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div className="m-auto flex items-center gap-2 text-xl font-bold">
      {children}
    </div>
  );
}
