import { type FC } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import Link from 'next/link';
import { Button } from '~/components/ui/button';

type Transaction = InferRouteOutput['transactions']['getByAccountId'][0];

type Props = {
  transaction: Transaction;
  hideLink?: boolean;
};

export const TransactionCard: FC<Props> = ({ transaction, hideLink }) => {
  return (
    <div className="flex items-center justify-between gap-10 rounded bg-slate-200 px-5 py-3 shadow-lg ">
      <div>
        <p className="text-lg">
          Descrição: <b>{transaction.description}</b>
        </p>

        <p>Valor: R$ {transaction.value}</p>

        <p>Categoria: {transaction.category || 'Nenhuma'}</p>

        <p>Momento: {transaction.time.toLocaleString()}</p>
      </div>

      {!hideLink && (
        <Link href={transaction.id} passHref>
          <Button>Ver mais</Button>
        </Link>
      )}
    </div>
  );
};
