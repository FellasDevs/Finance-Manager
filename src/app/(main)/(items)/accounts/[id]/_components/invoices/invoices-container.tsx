'use client';

import type { InferRouteOutput } from '~/utils/types';
import { api } from '~/trpc/react';
import React, { type ReactNode } from 'react';
import { Spinner } from '~/app/_components/ui/spinner';
import { InvoiceList } from '~/app/(main)/(items)/accounts/[id]/_components/invoices/invoice-list';
import { InvoicesGraph } from '~/app/(main)/(items)/accounts/[id]/_components/invoices/invoices-graph';
import { InvoiceForm } from '~/app/(main)/(items)/accounts/[id]/_components/invoices/invoice-form';
import { Card } from '~/app/_components/ui/card';

export type InvoicesRouteOutput =
  InferRouteOutput['invoices']['getByAccountId'];

type Props = {
  accountId: string;
  initialData: InvoicesRouteOutput;
};

export function InvoicesContainer({ accountId, initialData }: Props) {
  const {
    data: invoices,
    error,
    isPending,
  } = api.invoices.getByAccountId.useQuery({ accountId }, { initialData });

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
        <div className="text-2xl font-bold">Faturas</div>
        <InvoiceForm accountId={accountId} />
      </div>

      {!invoices.length ? (
        <ErrorMessage>Nenhuma fatura encontrada</ErrorMessage>
      ) : (
        <div className="flex flex-col gap-4 lg:flex-row">
          <InvoiceList invoices={invoices} />
          <InvoicesGraph invoices={invoices} />
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
