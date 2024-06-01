'use client';

import { AccountCard } from '~/app/_components/accounts/account-card';
import { useBankAccounts } from '~/hooks/bank-accounts-hooks';
import { BankAccountForm } from '~/app/_components/accounts/bank-account-form';
import { Spinner } from '~/app/_components/global/spinner';

export default function AccountsPage() {
  const {
    accountsQuery: { data: accounts, isPending: accountsPending },
    createAccountMutation: { variables, isPending: newAccountPending },
  } = useBankAccounts();

  return (
    <div className="flex flex-col gap-5 p-5">
      <BankAccountForm />

      <div>
        <div className="flex gap-5">
          <span className="text-2xl font-bold">Contas</span>

          {accountsPending && <Spinner />}
        </div>

        <div className="flex w-fit max-w-[30em] flex-col gap-2 rounded-lg p-5 shadow-lg">
          {accounts?.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}

          {variables && newAccountPending && (
            <AccountCard
              account={{
                userId: '',
                id: variables.name,
                name: '...' + variables.name,
                balance: variables.balance ?? 0,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
