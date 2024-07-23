'use client';

import { api } from '~/trpc/react';
import { type InferRouteOutput } from '~/utils/types';
import { AccountCard } from '~/app/(main)/dashboard/_components/accounts/account-card';
import { BankAccountForm } from '~/app/(main)/dashboard/_components/accounts/bank-account-form';
import { Card } from '~/app/_components/ui/card';

type Props = {
  initialData: InferRouteOutput['bankAccounts']['getByUser'];
};

export function AccountList({ initialData }: Props) {
  const { data: accounts } = api.bankAccounts.getByUser.useQuery(undefined, {
    initialData,
  });

  return (
    <Card className="flex max-w-[40em] flex-col gap-4 p-5">
      <div className="flex justify-between">
        <span className="text-2xl font-bold">Contas bancárias</span>
        <BankAccountForm />
      </div>

      <div className="grid max-h-[70vh] grid-flow-row grid-cols-2 gap-3 overflow-auto p-2">
        {accounts?.length ? (
          accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))
        ) : (
          <div className="text-lg font-semibold">
            Não há nenhuma conta ainda, crie uma para começar!
          </div>
        )}
      </div>
    </Card>
  );
}
