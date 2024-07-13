'use client';

import { type FC, useMemo } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import { Button } from '~/app/_components/ui/button';
import { Trash } from 'lucide-react';
import { api } from '~/trpc/react';
import dayjs from 'dayjs';
import { parseMoney } from '~/utils/parseMoney';
import { type PurchaseCategories } from '~/app/(main)/(items)/accounts/[id]/page';
import { Card } from '~/app/_components/ui/card';

type Transaction = InferRouteOutput['transactions']['getByAccountId'][0];

type Props = {
  transaction: Transaction;
  categories: PurchaseCategories;
};

export const TransactionCard: FC<Props> = ({ transaction, categories }) => {
  const { mutate: deleteTransaction } = api.transactions.delete.useMutation();

  const category = useMemo(
    () =>
      categories?.find((category) => category.id === transaction.categoryId)
        ?.name || '',
    [categories, transaction.categoryId],
  );

  return (
    <Card className="flex items-center justify-between gap-10 px-5 py-3">
      <div>
        <p className="text-lg">
          Descrição: <b>{transaction.description}</b>
        </p>

        <p>
          Valor:{' '}
          <b
            className={
              transaction.value > 0 ? 'text-green-500' : 'text-red-500'
            }
          >
            {parseMoney(transaction.value)}
          </b>
        </p>

        <p>
          Categoria: <b>{category || 'Nenhuma'}</b>
        </p>

        <p>
          Data: <b>{dayjs(transaction.time).format('DD/mm/YYYY HH:mm')}</b>
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteTransaction({ id: transaction.id })}
      >
        <Trash className="text-red-500" />
      </Button>
    </Card>
  );
};
