import { api } from '~/trpc/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CurrentInvestmentCard } from '~/app/(main)/investments/[id]/_components/CurrentInvestmentCard';

type Params = {
  params: { id: string };
};

export default async function InvestmentPage({ params: { id } }: Params) {
  try {
    const investment = await api.investments.getById({ id });

    if (!investment) return <InvestmentNotFound />;

    // const [invoices, transactions] = await Promise.all([
    //     api.invoices.getByAccountId({ accountId: id }),
    //     api.transactions.getByAccountId({ accountId: id }),
    // ]);

    return (
      <div className="flex flex-wrap gap-12 p-10">
        <div>
          <Link
            href={'/dashboard'}
            className="mb-2 flex items-center gap-1 rounded-lg bg-blue-200 p-2 text-lg hover:bg-blue-300"
          >
            <ArrowLeft size={24} />
            <p>Voltar ao início</p>
          </Link>

          <CurrentInvestmentCard initialData={investment} />
        </div>

        {/*<TransactionsList accountId={id} initialData={transactions} />*/}
        {/*<InvoiceList accountId={id} initialData={invoices} />*/}
      </div>
    );
  } catch (e) {
    console.error(e);
    return <InvestmentNotFound />;
  }
}

function InvestmentNotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-2xl font-bold">
      <p>Investimento não encontrada</p>

      <Link href={'/dashboard'}>
        <p className="underline">Retornar ao início</p>
      </Link>
    </div>
  );
}
