'use client';

import { api } from '~/trpc/react';
import { type InferRouteOutput } from '~/utils/types';
import { AccountCard } from '~/app/(main)/accounts/_components/account-card';

type Props = {
  initialData: InferRouteOutput['bankAccounts']['getByUser'];
};

export function AccountList({ initialData }: Props) {
  const accounts = api.bankAccounts.getByUser.useQuery(undefined, {
    initialData,
  });

  return (
    <div className="grid max-h-[70vh] grid-flow-row grid-cols-2 gap-3 overflow-auto p-2">
      {accounts.data?.length ? (
        accounts.data.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))
      ) : (
        <div className="text-lg font-semibold">
          Não há nenhuma conta ainda, crie uma para começar!
        </div>
      )}
    </div>
  );
}
