'use client';

import { api } from '~/trpc/react';
import { type FC, useState } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import { TransactionCard } from '~/app/(main)/accounts/[id]/_components/transactions/transaction-card';
import { TransactionForm } from '~/app/(main)/accounts/[id]/_components/transactions/transaction-form';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '~/app/_components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import { Input } from '~/app/_components/ui/input';

type Props = {
  accountId: string;
  initialData: InferRouteOutput['transactions']['getByAccountId'];
};

export const TransactionsList: FC<Props> = ({ accountId, initialData }) => {
  const { data: transactions, error } =
    api.transactions.getByAccountId.useQuery({ accountId }, { initialData });

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex h-[28em] w-[30em] flex-col justify-around rounded p-5 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="m-3 text-2xl font-bold">TRANSAÇÕES</div>

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger>
            <PlusCircle color="green" />
          </DialogTrigger>

          <DialogContent>
            <TransactionForm
              accountId={accountId}
              onSuccess={() => setModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Input placeholder="Pesquisa" />

      <div className="flex max-h-[18em] flex-col gap-2 overflow-auto p-5">
        {error || !transactions?.length ? (
          <div className="my-10 text-center text-xl font-bold">
            Não há transações
          </div>
        ) : (
          transactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
    </div>
  );
};
