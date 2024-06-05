import { api } from '~/trpc/server';
import Link from 'next/link';
import { AccountCard } from '~/app/(main)/accounts/_components/account-card';
import { InvoicesList } from '~/app/(main)/accounts/[id]/invoices/_components/invoices-list';

type Params = {
  params: { id: string };
};

export default async function InvoicesPage({ params: { id } }: Params) {
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

  const invoices = await api.invoices.getByAccountId({ accountId: id });

  return (
    <div className="flex justify-center gap-32 p-10">
      <div className="flex flex-col gap-10">
        <div className="w-fit min-w-[15em]">
          <AccountCard account={account} hideActions />
        </div>
      </div>

      <InvoicesList accountId={id} initialData={invoices} />
    </div>
  );
}
