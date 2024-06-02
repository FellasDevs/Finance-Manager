'use client';

import { type FC } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import { Button } from '~/app/_components/ui/button';
import { Trash } from 'lucide-react';

type Transaction = InferRouteOutput['transactions']['getByAccountId'][0];

type Props = {
  transaction: Transaction;
  deleteTransaction: () => void;
};

export const TransactionCard: FC<Props> = ({
  transaction,
  deleteTransaction,
}) => {
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

      <Button variant="ghost" size="icon" onClick={deleteTransaction}>
        <Trash color="red" />
      </Button>
    </div>
  );
};
