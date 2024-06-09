import { BankAccountForm } from '~/app/(main)/accounts/_components/bank-account-form';
import { api } from '~/trpc/server';
import { AccountList } from '~/app/(main)/accounts/_components/account-list';

export default async function AccountsPage() {
  const accounts = await api.bankAccounts.getByUser();

  return (
    <div className="flex justify-center gap-32 p-10">
      <BankAccountForm />

      <div className="flex max-w-[50em] flex-col gap-4 rounded-lg p-5 shadow-lg">
        <span className="text-2xl font-bold">Contas bancárias</span>

        <AccountList initialData={accounts} />
      </div>
    </div>
  );
}
