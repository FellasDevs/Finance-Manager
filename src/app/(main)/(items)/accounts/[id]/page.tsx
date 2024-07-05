import { api } from '~/trpc/server';
import Link from 'next/link';
import { InvoiceList } from '~/app/(main)/(items)/accounts/[id]/_components/invoices/invoice-list';
import { TransactionsList } from '~/app/(main)/(items)/accounts/[id]/_components/transactions/transaction-list';
import { CurrentAccountCard } from '~/app/(main)/(items)/accounts/[id]/_components/CurrentAccountCard';
import { TransactionsGraph } from '~/app/(main)/(items)/accounts/[id]/_components/transactions/transactions-graph';
import { InvoicesGraph } from '~/app/(main)/(items)/accounts/[id]/_components/invoices/invoices-graph';
import { type InferRouteOutput } from '~/utils/types';

export type PurchaseCategories =
  InferRouteOutput['purchaseCategories']['getByUser'];

type Props = {
  params: { id: string };
};

export default async function AccountPage({ params: { id } }: Props) {
  try {
    const account = await api.bankAccounts.getById({ id });

    if (!account) return <AccountNotFound />;

    const [invoices, transactions, categories] = await Promise.all([
      api.invoices.getByAccountId({ accountId: id }),
      api.transactions.getByAccountId({ accountId: id }),
      api.purchaseCategories.getByUser(),
    ]);

    return (
      <div className="m-auto flex flex-col gap-5">
        <CurrentAccountCard initialData={account} />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            <InvoiceList accountId={id} initialData={invoices} />
            <InvoicesGraph accountId={id} initialData={invoices} />
          </div>

          <div className="flex flex-col  gap-6 lg:flex-row">
            <TransactionsList
              accountId={id}
              initialTransactions={transactions}
              initialCategories={categories}
            />
            <TransactionsGraph
              accountId={id}
              initialTransactions={transactions}
              initialCategories={categories}
            />
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
    return <AccountNotFound />;
  }
}

function AccountNotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-2xl font-bold">
      <p>Conta não encontrada</p>

      <Link href={'/dashboard'}>
        <p className="underline">Retornar ao início</p>
      </Link>
    </div>
  );
}

export async function generateMetadata({ params: { id } }: Props) {
  const account = await api.bankAccounts.getById({ id });

  return {
    title: 'Finance Manager - ' + account?.name || 'Conta não encontrada',
    description: 'Gerencie suas faturas e transações',
  };
}
