'use client';

import type { InferRouteOutput } from '~/utils/types';
import { api } from '~/trpc/react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '~/app/_components/ui/dialog';
import { Button } from '~/app/_components/ui/button';
import { PlusCircle } from 'lucide-react';
import { BankAccountForm } from '~/app/(main)/dashboard/_components/accounts/bank-account-form';

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

  return (
    <div className="flex max-w-[50em] flex-col gap-4 rounded-lg p-5 shadow-lg">
      <div className="flex justify-between">
        <span className="text-2xl font-bold">Investimentos</span>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <PlusCircle color="green" />
            </Button>
          </DialogTrigger>

          <DialogContent className="flex flex-col">
            <DialogClose className="ml-auto" />
            <BankAccountForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid max-h-[70vh] grid-flow-row grid-cols-2 gap-3 overflow-auto p-2">
        {investments?.length ? (
          investments.map(
            (investment) =>
              // <AccountCard key={account.id} account={account} />
              investment.name,
          )
        ) : (
          <div className="text-lg font-semibold">
            Não há nenhum investimento ainda, crie um para começar!
          </div>
        )}
      </div>
    </div>
  );
}
