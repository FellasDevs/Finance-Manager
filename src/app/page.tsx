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
    <div className="flex justify-center gap-32 p-10">
      <BankAccountForm />

      <div>
        <div className="mb-5 flex gap-3">
          <span className="text-2xl font-bold">Contas bancárias</span>

          {accountsPending && <Spinner />}
        </div>

        <div className="flex max-h-[80vh] max-w-[50em] flex-wrap gap-3 overflow-auto rounded-lg p-5 shadow-lg">
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
