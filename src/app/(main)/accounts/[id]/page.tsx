import { api } from '~/trpc/server';
import Link from 'next/link';
import { InvoiceList } from '~/app/(main)/accounts/[id]/_components/invoices/invoice-list';
import { TransactionsList } from '~/app/(main)/accounts/[id]/_components/transactions/transaction-list';
import { CurrentAccountCard } from '~/app/(main)/accounts/[id]/_components/CurrentAccountCard';
import { ArrowLeft } from 'lucide-react';

type Params = {
  params: { id: string };
};

export default async function AccountPage({ params: { id } }: Params) {
  try {
    const account = await api.bankAccounts.getById({ id });

    if (!account) return <AccountNotFound />;

    const [invoices, transactions] = await Promise.all([
      api.invoices.getByAccountId({ accountId: id }),
      api.transactions.getByAccountId({ accountId: id }),
    ]);

    return (
      <div className="flex flex-wrap gap-12 p-10">
        <div>
          <Link
            href="/accounts"
            className="mb-2 flex items-center gap-1 rounded-lg bg-blue-200 p-2 text-lg hover:bg-blue-300"
          >
            <ArrowLeft size={24} />
            <p>Voltar às contas</p>
          </Link>

          <CurrentAccountCard initialData={account} />
        </div>

        <TransactionsList accountId={id} initialData={transactions} />
        <InvoiceList accountId={id} initialData={invoices} />
      </div>
    );
  } catch (e) {
    return <AccountNotFound />;
  }
}

function AccountNotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-2xl font-bold">
      <p>Conta não encontrada</p>

      <Link href={'/accounts'}>
        <p className="underline">Retornar às minhas contas</p>
      </Link>
    </div>
  );
}
