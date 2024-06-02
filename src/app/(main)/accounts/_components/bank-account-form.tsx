'use client';

import { Button } from '~/app/_components/ui/button';
import { Input } from '~/app/_components/ui/input';
import { api } from '~/trpc/react';

export const BankAccountForm = () => {
  const { mutateAsync, isPending } = api.bankAccounts.create.useMutation();

  return (
    <form
      className="flex h-fit w-[25em] flex-col gap-3 rounded p-3 shadow-lg"
      onSubmit={async (e) => {
        e.preventDefault();

        const target = e.target as HTMLFormElement;
        const values = new FormData(target);

        try {
          await mutateAsync({
            name: values.get('name') as string,
            balance: Number(values.get('balance')),
          });

          target.reset();
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <span className="text-2xl font-bold">Nova conta</span>

      <Input type="text" placeholder="Nome" name="name" maxLength={50} />

      <Input type="number" step={0.01} placeholder="Saldo" name="balance" />

      <Button
        type="submit"
        disabled={isPending}
        isLoading={isPending}
        variant="outline"
      >
        Criar
      </Button>
    </form>
  );
};
