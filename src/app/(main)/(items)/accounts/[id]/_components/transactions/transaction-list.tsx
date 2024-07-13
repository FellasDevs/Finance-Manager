'use client';

import { type FC } from 'react';
import { TransactionCard } from '~/app/(main)/(items)/accounts/[id]/_components/transactions/transaction-card';
import type { PurchaseCategories } from '~/app/(main)/(items)/accounts/[id]/page';
import { type TransactionsRouteOutput } from '~/app/(main)/(items)/accounts/[id]/_components/transactions/transactions-container';
import { Card } from '~/app/_components/ui/card';

type Props = {
  transactions: TransactionsRouteOutput;
  categories: PurchaseCategories;
};

export const TransactionsList: FC<Props> = ({ transactions, categories }) => {
  return (
    <Card className="flex max-h-[35em] w-[25em] flex-col gap-2 overflow-auto p-5">
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          categories={categories}
        />
      ))}
    </Card>
  );
};
