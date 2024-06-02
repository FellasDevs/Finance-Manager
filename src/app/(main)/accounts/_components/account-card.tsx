'use client';

import { type FC, useState } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import Link from 'next/link';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '~/app/_components/ui/button';
import { Input } from '~/app/_components/ui/input';
import { api } from '~/trpc/react';

type Account = InferRouteOutput['bankAccounts']['getByUser'][0];

type Props = {
  account: Account;
  hideActions?: boolean;
};

export const AccountCard: FC<Props> = ({ account, hideActions }) => {
  const deleteAccountMutation = api.bankAccounts.delete.useMutation();

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex min-h-[7em] min-w-[18em] max-w-[25em] items-center justify-between gap-3 rounded bg-slate-200 px-5 shadow-lg">
      {isEditing ? (
        <EditForm account={account} setIsEditing={() => setIsEditing(false)} />
      ) : (
        <Info account={account} />
      )}

      {!hideActions && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={18} color="blue" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteAccountMutation.mutate({ id: account.id })}
            >
              <Trash size={18} color="red" />
            </Button>
          </div>

          <Link href={'accounts/' + account.id} passHref>
            <Button>Ver mais</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

const Info = ({ account }: { account: Account }) => {
  return (
    <div className="max-w-[16em]">
      <p className="line-clamp-2 overflow-hidden text-ellipsis text-lg font-bold">
        {account.name || 'Conta sem nome'}
      </p>

      <p>R$ {account.balance}</p>
    </div>
  );
};

const EditForm = ({
  account,
  setIsEditing,
}: {
  account: Account;
  setIsEditing: () => void;
}) => {
  const editAccountMutation = api.bankAccounts.edit.useMutation();

  return (
    <form
      className="flex flex-col gap-1 py-2"
      onSubmit={async (e) => {
        e.preventDefault();

        const target = e.target as HTMLFormElement;
        const values = new FormData(target);

        await editAccountMutation.mutateAsync({
          id: account.id,
          name: String(values.get('name')),
          balance: Number(values.get('balance')),
        });

        setIsEditing();
      }}
    >
      <Input
        type="text"
        placeholder="Nome"
        defaultValue={account.name}
        name="name"
        maxLength={50}
      />

      <Input
        type="number"
        step={0.01}
        placeholder="Valor"
        defaultValue={account.balance}
        name="balance"
      />

      <div className="flex justify-around">
        <Button variant="outline" size="sm" onClick={setIsEditing}>
          Cancelar
        </Button>

        <Button type="submit" size="sm">
          Salvar
        </Button>
      </div>
    </form>
  );
};
