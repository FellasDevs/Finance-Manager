'use client';

import React, { type FC, useState } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import Link from 'next/link';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '~/app/_components/ui/button';
import { Input } from '~/app/_components/ui/input';
import { api } from '~/trpc/react';
import { parseMoney } from '~/utils/parseMoney';
import type { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/app/_components/ui/form';
import { EditBankAccountParams } from '~/procedure-params/bank-account-params';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '~/app/_components/ui/dialog';
import { DialogBody } from 'next/dist/client/components/react-dev-overlay/internal/components/Dialog';

type Account = InferRouteOutput['bankAccounts']['getByUser'][0];

type Props = {
  account: Account;
  fromAccountPage?: boolean;
};

export const AccountCard: FC<Props> = ({ account, fromAccountPage }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: deleteAccount, isPending } =
    api.bankAccounts.delete.useMutation({
      onSuccess: () => setDialogOpen(false),
    });

  return (
    <div className="flex min-h-[7em] min-w-[18em] max-w-[25em] items-center justify-between gap-3 rounded bg-slate-200 px-5 shadow-lg">
      {isEditing ? (
        <EditForm account={account} setIsEditing={() => setIsEditing(false)} />
      ) : (
        <Info account={account} />
      )}

      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={18} color="blue" />
          </Button>

          {!fromAccountPage && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash size={18} color="red" />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogTitle>Excluir conta</DialogTitle>
                <DialogClose />

                <DialogBody>
                  <p className="mb-3">
                    Tem certeza que deseja excluir a conta e todos os seus
                    dados?
                  </p>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancelar
                    </Button>

                    <Button
                      variant="destructive"
                      isLoading={isPending}
                      disabled={isPending}
                      onClick={() => deleteAccount({ id: account.id })}
                    >
                      Confirmar
                    </Button>
                  </div>
                </DialogBody>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {!fromAccountPage && (
          <Link href={'accounts/' + account.id} passHref>
            <Button>Ver mais</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

const Info = ({ account }: { account: Account }) => {
  return (
    <div className="max-w-[16em]">
      <p className="line-clamp-2 overflow-hidden text-ellipsis text-lg font-bold">
        {account.name}
      </p>

      <p>{parseMoney(account.balance)}</p>
    </div>
  );
};

type EditBankAccountInput = z.infer<typeof EditBankAccountParams>;

const EditForm = ({
  account,
  setIsEditing,
}: {
  account: Account;
  setIsEditing: () => void;
}) => {
  const form = useForm<EditBankAccountInput>({
    resolver: zodResolver(EditBankAccountParams),
    mode: 'onTouched',
    defaultValues: account,
  });

  const { mutate, isPending } = api.bankAccounts.edit.useMutation({
    onSuccess: setIsEditing,
  });

  const onSubmit = form.handleSubmit((data) => mutate(data));

  return (
    <Form {...form}>
      <form className="flex flex-col gap-1 py-2" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Insira o nome da conta"
                  {...field}
                  autoComplete="on"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  step={0.01}
                  placeholder="Insira o saldo da conta"
                  {...field}
                  onChange={(e) =>
                    form.setValue('balance', parseFloat(e.target.value))
                  }
                  autoComplete="on"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-around">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isPending}
            isLoading={isPending}
            onClick={setIsEditing}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            size="sm"
            disabled={isPending || !form.formState.isValid}
            isLoading={isPending}
          >
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
};
