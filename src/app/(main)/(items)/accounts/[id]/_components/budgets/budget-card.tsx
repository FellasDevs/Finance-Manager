'use client';

import { type InferRouteOutput } from '~/utils/types';
import { useMemo } from 'react';
import { parseMoney } from '~/utils/parseMoney';
import { api } from '~/trpc/react';
import { Button } from '~/app/_components/ui/button';
import { FaTrash } from 'react-icons/fa';
import { BudgetForm } from '~/app/(main)/(items)/accounts/[id]/_components/budgets/budget-form';
import { Progress } from '~/app/_components/ui/progress';

export type Budget = InferRouteOutput['budgets']['getByInvoice'][0];

type Props = {
  budget: Budget;
};

export function BudgetCard({ budget }: Props) {
  const { data: categories } = api.purchaseCategories.getByUser.useQuery();

  const { data: purchases } = api.purchases.getByInvoice.useQuery({
    invoiceId: budget.invoiceId,
  });

  const { mutate: deleteBudget, isPending } = api.budgets.delete.useMutation();

  const category = useMemo(
    () => categories?.find((category) => category.id === budget.categoryId),
    [categories, budget.categoryId],
  );

  const totalSpent = useMemo(
    () =>
      purchases
        ?.filter((purchase) => purchase.categoryId === budget.categoryId)
        .reduce((sum, purchase) => sum + purchase.value, 0) || 0,
    [purchases, budget.categoryId],
  );

  const percent = useMemo(() => {
    return (totalSpent / budget.value) * 100;
  }, [totalSpent, budget.value]);

  return (
    <div className="rounded-lg p-3 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="mb-1 text-xl">
            Categoria: <b>{category?.name}</b>
          </p>

          <p className="text-lg font-semibold">
            {parseMoney(totalSpent)} / {parseMoney(budget.value)}
          </p>
        </div>

        <div className="min-w-fit">
          <BudgetForm invoiceId={budget.invoiceId} createdBudget={budget} />

          <Button
            onClick={() =>
              deleteBudget({
                invoiceId: budget.invoiceId,
                categoryId: budget.categoryId,
              })
            }
            disabled={isPending}
            variant="ghost"
            size="icon"
          >
            <FaTrash size={20} className="text-red-500" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Progress value={percent} />

        <p className="min-w-fit"></p>
      </div>
    </div>
  );
}
