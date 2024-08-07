import { api } from '~/trpc/server';
import Link from 'next/link';
import { CurrentInvestmentCard } from '~/app/(main)/(items)/investments/[id]/_components/CurrentInvestmentCard';
import { InvestmentContainer } from '~/app/(main)/(items)/investments/[id]/_components/investment-container';

type Props = {
  params: { id: string };
};

export default async function InvestmentPage({ params: { id } }: Props) {
  try {
    const investment = await api.investments.getById({ id });

    if (!investment) return <InvestmentNotFound />;

    const investmentHistory = await api.investmentsHistory.getAllByInvestment({
      investmentId: investment.id,
    });

    return (
      <div className="m-auto flex flex-col gap-6">
        <CurrentInvestmentCard initialData={investment} />

        <InvestmentContainer
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

export async function generateMetadata({ params: { id } }: Props) {
  const investment = await api.investments.getById({ id });

  return {
    title:
      'Finance Manager - ' + investment?.name || 'Investimento não encontrado',
    description: 'Gerencie as atualizações de seu investimento',
  };
}
