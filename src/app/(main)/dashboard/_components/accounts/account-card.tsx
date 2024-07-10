'use client';

import React, { type FC, useState } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import Link from 'next/link';
import { Trash } from 'lucide-react';
import { Button } from '~/app/_components/ui/button';
import { api } from '~/trpc/react';
import { parseMoney } from '~/utils/parseMoney';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '~/app/_components/ui/dialog';
import { DialogBody } from 'next/dist/client/components/react-dev-overlay/internal/components/Dialog';
import { BankAccountForm } from '~/app/(main)/dashboard/_components/accounts/bank-account-form';

export type BankAccount = InferRouteOutput['bankAccounts']['getByUser'][0];

type Props = {
  account: BankAccount;
  fromAccountPage?: boolean;
};

export const AccountCard: FC<Props> = ({ account, fromAccountPage }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: deleteAccount, isPending } =
    api.bankAccounts.delete.useMutation({
      onSuccess: () => setDialogOpen(false),
    });

  return (
    <div className="flex min-h-[7em] w-fit min-w-[18em] max-w-[25em] items-center justify-between gap-3 rounded-lg bg-slate-200 px-5 shadow-lg">
      <div className="max-w-[16em]">
        <p className="line-clamp-2 overflow-hidden text-ellipsis text-xl font-bold">
          {account.name}
        </p>

        <p className="text-lg">{parseMoney(account.balance)}</p>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <BankAccountForm originalBankAccount={account} />

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
