import { api } from '~/trpc/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CurrentInvestmentCard } from '~/app/(main)/investments/[id]/_components/CurrentInvestmentCard';
import { InvestmentHistoryList } from '~/app/(main)/investments/[id]/_components/investment-history/investment-history-list';
import { InvestmentHistoryGraph } from '~/app/(main)/investments/[id]/_components/investment-history/investment-history-graph';

type Params = {
  params: { id: string };
};

export default async function InvestmentPage({ params: { id } }: Params) {
  try {
    const investment = await api.investments.getById({ id });

    if (!investment) return <InvestmentNotFound />;

    const investmentHistory = await api.investmentsHistory.getAllByInvestment({
      investmentId: investment.id,
    });

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

        <InvestmentHistoryList
          investmentId={investment.id}
          initialData={investmentHistory}
        />

        <InvestmentHistoryGraph
          investmentId={investment.id}
          initialData={investmentHistory}
        />
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
      <p>Investimento não encontrado</p>

      <Link href={'/dashboard'}>
        <p className="underline">Retornar ao início</p>
      </Link>
    </div>
  );
}
