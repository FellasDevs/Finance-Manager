import { api } from '~/trpc/server';
import { AccountCard } from '~/app/(main)/accounts/_components/account-card';
import { TransactionsList } from '~/app/(main)/accounts/[id]/transactions/_components/transaction-list';
import { TransactionForm } from '~/app/(main)/accounts/[id]/transactions/_components/transaction-form';
import Link from 'next/link';

type Params = {
  params: { id: string };
};

export default async function AccountPage({ params: { id } }: Params) {
  const account = await api.bankAccounts.getById({ id });

  if (!account)
    return (
      <div className="flex h-screen flex-col items-center justify-center text-2xl font-bold">
        <p>Conta não encontrada</p>

        <Link href={'/accounts'}>
          <p className="underline">Retornar às minhas contas</p>
        </Link>
      </div>
    );

  const transactions = await api.transactions.getByAccountId({ accountId: id });

  return (
    <div className="flex justify-center gap-32 p-10">
      <div className="flex flex-col gap-10">
        <div className="w-fit min-w-[15em]">
          <AccountCard account={account} hideActions />
        </div>

        <TransactionForm accountId={id} />
      </div>

      <TransactionsList accountId={id} initialData={transactions} />
    </div>
  );
}
