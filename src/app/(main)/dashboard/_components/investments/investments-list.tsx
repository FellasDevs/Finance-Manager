'use client';

import type { InferRouteOutput } from '~/utils/types';
import { api } from '~/trpc/react';
import { useState } from 'react';
import { InvestmentsForm } from '~/app/(main)/dashboard/_components/investments/investments-form';
import { InvestmentCard } from '~/app/(main)/dashboard/_components/investments/investment-card';

type Props = {
  initialData: InferRouteOutput['investments']['getAllByUser'];
};

export function InvestmentsList({ initialData }: Props) {
  const { data: investments } = api.investments.getAllByUser.useQuery(
    undefined,
    {
      initialData,
    },
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex max-w-[40em] flex-col gap-4 rounded-lg p-5 shadow-lg">
      <div className="flex justify-between">
        <span className="text-2xl font-bold">Investimentos</span>
        <InvestmentsForm />
      </div>

      <div className="grid max-h-[70vh] grid-flow-row grid-cols-2 gap-3 overflow-auto p-2">
        {investments?.length ? (
          investments.map((investment) => (
            <InvestmentCard key={investment.id} investment={investment} />
          ))
        ) : (
          <div className="text-lg font-semibold">
            Parece que você ainda não fez um investimento, que tal começar
            agora?
          </div>
        )}
      </div>
    </div>
  );
}
