'use client';

import { type FC } from 'react';
import { Input } from '~/app/_components/ui/input';
import { Button } from '~/app/_components/ui/button';
import { useTransactions } from '~/app/_hooks/transaction-hooks';

type Props = {
  accountId: string;
  refetchAccount: () => void;
};

export const TransactionForm: FC<Props> = ({ accountId, refetchAccount }) => {
  const {
    createTransactionMutation: { mutateAsync, isPending },
  } = useTransactions(accountId);

  return (
    <form
      className="flex max-w-[20em] flex-col gap-3 rounded p-3 shadow-lg"
      onSubmit={async (e) => {
        e.preventDefault();

        const target = e.target as HTMLFormElement;
        const values = new FormData(target);

        try {
          await mutateAsync({
            description: String(values.get('description')),
            value: Number(values.get('value')),
            category: String(values.get('category')),
            time: new Date(String(values.get('datetime'))),
            accountId,
          });

          refetchAccount();

          target.reset();
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <span className="text-2xl font-bold">Nova transação</span>

      <Input type="text" placeholder="Descrição" name="description" />

      <Input type="number" step={0.01} placeholder="Saldo" name="value" />

      <Input type="text" placeholder="Categoria" name="category" />

      <Input type="datetime-local" placeholder="Momento" name="datetime" />

      <Button type="submit" disabled={isPending} variant="outline">
        Criar
      </Button>
    </form>
  );
};
