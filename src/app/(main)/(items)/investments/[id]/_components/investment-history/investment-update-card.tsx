'use client';

import { Trash } from 'lucide-react';
import { type InferRouteOutput } from '~/utils/types';
import { api } from '~/trpc/react';
import dayjs from 'dayjs';
import { Button } from '~/app/_components/ui/button';
import { InvestmentUpdateForm } from '~/app/(main)/(items)/investments/[id]/_components/investment-history/investment-update-form';
import { Card } from '~/app/_components/ui/card';

export type InvestmentUpdate =
  InferRouteOutput['investmentsHistory']['getAllByInvestment'][0];

type Props = {
  investmentUpdate: InvestmentUpdate;
};

export function InvestmentUpdateCard({ investmentUpdate }: Props) {
  const { mutate: deleteInvestmentUpdate } =
    api.investmentsHistory.delete.useMutation();

  return (
    <Card className="flex items-center justify-between gap-10 px-5 py-3">
      <div>
        <p className="text-lg">
          Valor: <b>R$ {investmentUpdate.value}</b>
        </p>

        <p className="font-semibold">
          {dayjs(investmentUpdate.time).format('DD/mm/YYYY HH:mm')}
        </p>
      </div>

      <div className="flex gap-2">
        <InvestmentUpdateForm
          investmentId={investmentUpdate.investmentId}
          createdInvestmentUpdate={investmentUpdate}
        />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteInvestmentUpdate({ id: investmentUpdate.id })}
        >
          <Trash size={18} className="text-red-500" />
        </Button>
      </div>
    </Card>
  );
}
