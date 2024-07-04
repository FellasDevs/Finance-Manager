import React from 'react';
import { api } from '~/trpc/react';
import { BudgetCard } from '~/app/(main)/accounts/[id]/_components/budgets/budget-card';
import { BudgetForm } from '~/app/(main)/accounts/[id]/_components/budgets/budget-form';

type Props = {
  invoiceId: string;
};

export function BudgetsList({ invoiceId }: Props) {
  const { data: budgets, error } = api.budgets.getByInvoice.useQuery({
    invoiceId,
  });

  return (
    <div className="max-w-[28em] grow rounded-lg p-3 shadow-lg">
      <div className="mb-3 flex justify-between">
        <p className="text-2xl font-bold">Orçamentos</p>

        <BudgetForm invoiceId={invoiceId} />
      </div>

      {error || !budgets?.length ? (
        'Não há orçamentos registradas nessa fatura'
      ) : (
        <div className="flex max-h-[85%] flex-col gap-2 overflow-auto rounded-lg p-2">
          {budgets.map((budget, i) => (
            <BudgetCard budget={budget} key={'budget-' + i} />
          ))}
        </div>
      )}
    </div>
  );
}
