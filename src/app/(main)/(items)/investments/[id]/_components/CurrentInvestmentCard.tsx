'use client';

import { type InferRouteOutput } from '~/utils/types';
import { api } from '~/trpc/react';
import { InvestmentCard } from '~/app/(main)/dashboard/_components/investments/investment-card';

export type Investment = InferRouteOutput['investments']['getById'];

type Props = {
  initialData: Investment;
};

export function CurrentInvestmentCard({ initialData }: Props) {
  if (!initialData) return null;

  const { data: investment } = api.investments.getById.useQuery(
    { id: initialData.id },
    { initialData },
  );

  if (!investment) return <div>Investimento não encontrada</div>;

  return <InvestmentCard investment={investment} fromInvestmentPage />;
}
