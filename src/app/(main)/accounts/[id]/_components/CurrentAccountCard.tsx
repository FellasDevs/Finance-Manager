'use client';

import { type InferRouteOutput } from '~/utils/types';
import { api } from '~/trpc/react';
import { parseMoney } from '~/utils/parseMoney';

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

  return (
    <div className="flex h-fit w-fit flex-col gap-3 rounded-lg bg-blue-200 p-12">
      {account ? (
        <>
          <p className="text-xl font-bold">{account.name}</p>
          <p className="text-lg font-semibold">{parseMoney(account.balance)}</p>
        </>
      ) : (
        <p>Conta não encontrada</p>
      )}
    </div>
  );
}
