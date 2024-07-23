'use client';

import { InvestmentUpdateCard } from '~/app/(main)/(items)/investments/[id]/_components/investment-history/investment-update-card';
import { type InvestmentHistory } from '~/app/(main)/(items)/investments/[id]/_components/investment-container';
import { Card } from '~/app/_components/ui/card';

type Props = {
  history: InvestmentHistory;
};

export function InvestmentHistoryList({ history }: Props) {
  return (
    <Card className="flex max-h-[35em] w-[25em] flex-col gap-2 overflow-auto p-5">
      {history.map((update) => (
        <InvestmentUpdateCard key={update.id} investmentUpdate={update} />
      ))}
    </Card>
  );
}
