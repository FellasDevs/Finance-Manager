import { api } from '~/trpc/server';
import { AccountList } from '~/app/(main)/dashboard/_components/accounts/account-list';
import { InvestmentsList } from '~/app/(main)/dashboard/_components/investments/investments-list';

export default async function Dashboard() {
  const [accounts, investments] = await Promise.all([
    api.bankAccounts.getByUser(),
    api.investments.getAllByUser(),
  ]);

  return (
    <div className="flex flex-wrap p-10">
      <AccountList initialData={accounts} />
      <InvestmentsList initialData={investments} />
    </div>
  );
}
