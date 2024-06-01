'use client';

import { api } from '~/trpc/react';
import { TransactionForm } from '~/app/_components/transactions/transaction-form';
import { useTransactions } from '~/hooks/transaction-hooks';
import { Spinner } from '~/app/_components/global/spinner';
import { AccountCard } from '~/app/_components/accounts/account-card';
import { TransactionCard } from '~/app/_components/transactions/transaction-card';

type Params = {
  params: { id: string };
};

export default function AccountPage({ params: { id } }: Params) {
  const {
    data: accounts,
    isPending,
    error,
    refetch,
  } = api.bankAccounts.getById.useQuery({ id }, { staleTime: Infinity });

  if (isPending)
    return (
      <div>
        Carregando...
        <Spinner />
      </div>
    );

  if (error || !accounts) return <div>Conta não encontrada</div>;

  return (
    <div className="flex justify-center gap-32 p-10">
      <div className="flex flex-col gap-10">
        <div className="w-fit min-w-[15em]">
          <AccountCard account={accounts} hideLink />
        </div>

        <TransactionForm accountId={id} refetchAccount={refetch} />
      </div>

      <Transactions accountId={id} />
    </div>
  );
}

const Transactions = ({ accountId }: { accountId: string }) => {
  const {
    transactionsQuery: { data: transactions, error, isPending },
  } = useTransactions(accountId);

  if (isPending)
    return (
      <div>
        Carregando...
        <Spinner />
      </div>
    );

  return (
    <div className="w-[30em] rounded p-5 shadow-lg">
      <div className="m-3 text-2xl font-bold">Transações</div>

      <div className="flex max-h-[80vh] flex-col gap-2 overflow-auto p-5">
        {!!error || !transactions?.length ? (
          <div className="my-10 text-center text-xl font-bold">
            Não há transações
          </div>
        ) : (
          transactions.map((transaction) => (
            <TransactionCard
              transaction={transaction}
              hideLink
              key={transaction.id}
            />
          ))
        )}
      </div>
    </div>
  );
};
