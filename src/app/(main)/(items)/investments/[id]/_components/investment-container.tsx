'use client';

import type { InferRouteOutput } from '~/utils/types';
import { api } from '~/trpc/react';
import { InvestmentHistoryList } from '~/app/(main)/(items)/investments/[id]/_components/investment-history/investment-history-list';
import { InvestmentHistoryGraph } from '~/app/(main)/(items)/investments/[id]/_components/investment-history/investment-history-graph';
import { Card } from '~/app/_components/ui/card';
import { InvestmentUpdateForm } from '~/app/(main)/(items)/investments/[id]/_components/investment-history/investment-update-form';
import React, { type ReactNode } from 'react';

export type InvestmentHistory =
  InferRouteOutput['investmentsHistory']['getAllByInvestment'];

type Props = {
  investmentId: string;
  initialData: InvestmentHistory;
};

export function InvestmentContainer({ investmentId, initialData }: Props) {
  const {
    data: investmentHistory,
    error,
    isPending,
  } = api.investmentsHistory.getAllByInvestment.useQuery(
    { investmentId },
    { initialData },
  );

  if (isPending) return <ErrorMessage>Carregando...</ErrorMessage>;

  if (error)
    return <ErrorMessage>Ocorreu um erro: {error.message}</ErrorMessage>;

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center gap-4">
        <div className="text-2xl font-bold">Atualizações no investimento</div>
        <InvestmentUpdateForm investmentId={investmentId} />
      </div>

      {!investmentHistory.length ? (
        <div className="text-center text-gray-500">
          Nenhuma atualização encontrada
        </div>
      ) : (
        <div className="flex flex-col gap-12 lg:flex-row">
          <InvestmentHistoryList history={investmentHistory} />
          <InvestmentHistoryGraph history={investmentHistory} />
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
