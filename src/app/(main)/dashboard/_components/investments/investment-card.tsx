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
import { InvestmentsForm } from '~/app/(main)/dashboard/_components/investments/investments-form';

export type Investment = InferRouteOutput['investments']['getAllByUser'][0];

type Props = {
  investment: Investment;
  fromInvestmentPage?: boolean;
};

export const InvestmentCard: FC<Props> = ({
  investment,
  fromInvestmentPage,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: deleteInvestment, isPending } =
    api.investments.delete.useMutation({
      onSuccess: () => setDialogOpen(false),
    });

  return (
    <div className="flex min-h-[7em] min-w-[18em] max-w-[25em] items-center justify-between gap-3 rounded bg-slate-200 px-5 shadow-lg">
      <div className="max-w-[16em]">
        <p className="line-clamp-2 overflow-hidden text-ellipsis text-lg font-bold">
          {investment.name}
        </p>

        <p>{parseMoney(investment.value)}</p>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <InvestmentsForm originalInvestment={investment} />

          {!fromInvestmentPage && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash size={18} color="red" />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogTitle>Excluir investimento</DialogTitle>
                <DialogClose />

                <DialogBody>
                  <p className="mb-3">
                    Tem certeza que deseja excluir o investimento e todos os
                    seus dados?
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
                      onClick={() => deleteInvestment({ id: investment.id })}
                    >
                      Confirmar
                    </Button>
                  </div>
                </DialogBody>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {!fromInvestmentPage && (
          <Link href={'investments/' + investment.id} passHref>
            <Button>Ver mais</Button>
          </Link>
        )}
      </div>
    </div>
  );
};
