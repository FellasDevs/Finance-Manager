'use client';

import { type InferRouteOutput } from '~/utils/types';
import { api } from '~/trpc/react';
import { AccountCard } from '~/app/(main)/accounts/_components/account-card';

type Props = {
  initialData: InferRouteOutput['bankAccounts']['getById'];
};

export function CurrentAccountCard({ initialData }: Props) {
  const { data: account } = api.bankAccounts.getById.useQuery(
    {
      id: initialData!.id,
    },
    {
      initialData,
    },
  );

  if (!account) return <div>Conta não encontrada</div>;

  return <AccountCard account={account} fromAccountPage />;
}
