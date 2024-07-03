'use client';

import { type FC } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import { Button } from '~/app/_components/ui/button';
import { Trash } from 'lucide-react';
import { api } from '~/trpc/react';
import dayjs from 'dayjs';
import { parseMoney } from '~/utils/parseMoney';

type Transaction = InferRouteOutput['transactions']['getByAccountId'][0];

type Props = {
  transaction: Transaction;
};

export const TransactionCard: FC<Props> = ({ transaction }) => {
  const { mutate: deleteTransaction } = api.transactions.delete.useMutation();

  return (
    <div className="flex items-center justify-between gap-10 rounded bg-slate-200 px-5 py-3 shadow-lg">
      <div>
        <p className="text-lg">
          Descrição: <b>{transaction.description}</b>
        </p>

        <p>
          Valor:{' '}
          <b
            className={
              transaction.value > 0 ? 'text-green-600' : 'text-red-600'
            }
          >
            {parseMoney(transaction.value)}
          </b>
        </p>

        <p>
          Categoria: <b>{transaction.category || 'Nenhuma'}</b>
        </p>

        <p>
          Momento: <b>{dayjs(transaction.time).format('DD/mm/YYYY HH:mm')}</b>
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteTransaction({ id: transaction.id })}
      >
        <Trash color="red" />
      </Button>
    </div>
  );
};
