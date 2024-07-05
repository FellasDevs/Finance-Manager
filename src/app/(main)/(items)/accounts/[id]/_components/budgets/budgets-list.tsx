'use client';

import React, { type ReactNode } from 'react';
import { api } from '~/trpc/react';
import { BudgetCard } from '~/app/(main)/(items)/accounts/[id]/_components/budgets/budget-card';
import { BudgetForm } from '~/app/(main)/(items)/accounts/[id]/_components/budgets/budget-form';
import { Spinner } from '~/app/_components/ui/spinner';

type Props = {
  invoiceId: string;
};

export function BudgetsList({ invoiceId }: Props) {
  const {
    data: budgets,
    error,
    isPending,
  } = api.budgets.getByInvoice.useQuery({
    invoiceId,
  });

  return (
    <div className="min-w-[25em] grow rounded-lg p-3 shadow-lg">
      <div className="mb-3 flex justify-between">
        <p className="text-2xl font-bold">Orçamentos</p>

        <BudgetForm invoiceId={invoiceId} />
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
        ) : !budgets?.length ? (
          <ErrorMessage>
            Não há orçamentos registrados nessa fatura
          </ErrorMessage>
        ) : (
          <>
            {budgets.map((budget, i) => (
              <BudgetCard budget={budget} key={'budget-' + i} />
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
