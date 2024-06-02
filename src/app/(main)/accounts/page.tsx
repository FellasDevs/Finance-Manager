import { BankAccountForm } from '~/app/(main)/accounts/_components/bank-account-form';
import { api } from '~/trpc/server';
import { AccountList } from '~/app/(main)/accounts/_components/account-list';
import { Suspense } from 'react';
import { Spinner } from '~/app/_components/ui/spinner';

export default async function AccountsPage() {
  const accounts = await api.bankAccounts.getByUser();

  return (
    <div className="flex justify-center gap-32 p-10">
      <BankAccountForm />

      <div>
        <div className="mb-5 flex gap-3">
          <span className="text-2xl font-bold">Contas bancárias</span>
        </div>

        <Suspense fallback={<Spinner />}>
          <AccountList initialData={accounts} />
        </Suspense>
      </div>
    </div>
  );
}
