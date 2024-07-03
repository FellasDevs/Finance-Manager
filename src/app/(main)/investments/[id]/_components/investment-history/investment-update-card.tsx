'use client';

import { Trash } from 'lucide-react';
import { type InferRouteOutput } from '~/utils/types';
import { api } from '~/trpc/react';
import dayjs from 'dayjs';
import { Button } from '~/app/_components/ui/button';
import { InvestmentUpdateForm } from '~/app/(main)/investments/[id]/_components/investment-history/investment-update-form';

export type InvestmentUpdate =
  InferRouteOutput['investmentsHistory']['getAllByInvestment'][0];

type Props = {
  investmentUpdate: InvestmentUpdate;
};

export function InvestmentUpdateCard({ investmentUpdate }: Props) {
  const { mutate: deleteInvestmentUpdate } =
    api.investmentsHistory.delete.useMutation();

  return (
    <div className="flex items-center justify-between gap-10 rounded bg-slate-200 px-5 py-3 shadow-lg ">
      <div>
        <p>Valor: R$ {investmentUpdate.value}</p>

        <p>
          Momento: {dayjs(investmentUpdate.time).format('DD/mm/YYYY HH:mm')}
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
          <Trash color="red" size={18} />
        </Button>
      </div>
    </div>
  );
}
