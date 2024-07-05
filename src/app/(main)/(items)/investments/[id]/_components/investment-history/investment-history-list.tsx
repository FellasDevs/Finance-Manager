'use client';

import { type InferRouteOutput } from '~/utils/types';
import { api } from '~/trpc/react';
import { InvestmentUpdateCard } from '~/app/(main)/(items)/investments/[id]/_components/investment-history/investment-update-card';
import { InvestmentUpdateForm } from '~/app/(main)/(items)/investments/[id]/_components/investment-history/investment-update-form';

type Props = {
  investmentId: string;
  initialData: InferRouteOutput['investmentsHistory']['getAllByInvestment'];
};

export function InvestmentHistoryList({ investmentId, initialData }: Props) {
  const { data: investmentHistory, error } =
    api.investmentsHistory.getAllByInvestment.useQuery(
      { investmentId },
      { initialData },
    );

  return (
    <div className="flex max-h-[40em] w-[30em] flex-col gap-2 rounded-lg p-5 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="text-2xl font-bold">Atualizações no investimento</div>

        <InvestmentUpdateForm investmentId={investmentId} />
      </div>

      <div className="flex flex-col gap-2 overflow-auto p-5">
        {error || !investmentHistory?.length ? (
          <div className="my-10 text-center text-xl font-bold">
            Não há atualizações
          </div>
        ) : (
          investmentHistory.map((investmentUpdate) => (
            <InvestmentUpdateCard
              key={investmentUpdate.id}
              investmentUpdate={investmentUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
}
