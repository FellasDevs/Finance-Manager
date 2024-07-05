import { api } from '~/trpc/server';
import { AccountList } from '~/app/(main)/dashboard/_components/accounts/account-list';
import { InvestmentsList } from '~/app/(main)/dashboard/_components/investments/investments-list';

export default async function Dashboard() {
  const [accounts, investments] = await Promise.all([
    api.bankAccounts.getByUser(),
    api.investments.getAllByUser(),
  ]);

  return (
    <div className="flex flex-wrap gap-3 p-10">
      <AccountList initialData={accounts} />
      <InvestmentsList initialData={investments} />
    </div>
  );
}

export const metadata = {
  title: 'Finance Manager - Início',
  description: 'Navegue suas contas e investimentos',
};
