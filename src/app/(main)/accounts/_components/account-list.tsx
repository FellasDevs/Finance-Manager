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
    <div className="flex max-h-[80vh] max-w-[50em] flex-wrap gap-3 overflow-auto rounded-lg p-5 shadow-lg">
      {accounts.data?.length ? (
        accounts.data.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))
      ) : (
        <div className="text-lg font-semibold">
          Não há nehuma conta ainda, crie uma para começar!
        </div>
      )}
    </div>
  );
}
