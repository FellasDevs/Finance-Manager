'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '~/app/_components/ui/dialog';
import { Button } from '~/app/_components/ui/button';
import { type Invoice } from '~/app/(main)/(items)/accounts/[id]/_components/invoices/invoice-card';
import { api } from '~/trpc/react';
import { InvoiceHeader } from '~/app/(main)/(items)/accounts/[id]/_components/invoices/invoice-header';
import { Switch } from '~/app/_components/ui/switch';
import { Label } from '~/app/_components/ui/label';
import React, { useMemo } from 'react';
import { PurchasesList } from '~/app/(main)/(items)/accounts/[id]/_components/purchases/purchases-list';
import { BudgetsList } from '~/app/(main)/(items)/accounts/[id]/_components/budgets/budgets-list';
import { PurchasesGraph } from '~/app/(main)/(items)/accounts/[id]/_components/purchases/purchases-graph';

type Props = {
  invoice: Invoice;
};

export function InvoiceDialog({ invoice }: Props) {
  const { mutate: editInvoice, isPending: isEditing } =
    api.invoices.edit.useMutation();
  const { mutate: payInvoice, isPending: isPaying } =
    api.invoices.payWithAccountBalance.useMutation();

  const isPending = useMemo(() => isEditing || isPaying, [isEditing, isPaying]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Ver mais</Button>
      </DialogTrigger>

      <DialogContent className="flex h-[95vh] w-fit max-w-[90vw] flex-col overflow-auto p-8">
        <div className="mx-auto flex w-full max-w-[30em] flex-col gap-2">
          <InvoiceHeader invoice={invoice} fromDialog />

          <hr />

          <div className="flex flex-col items-center justify-between gap-3 p-2 md:flex-row">
            <div className="flex gap-2">
              <Switch
                id="paid"
                checked={invoice.paid}
                onCheckedChange={(paid) =>
                  editInvoice({ id: invoice.id, paid })
                }
                disabled={isPending}
              />

              <Label htmlFor="paid" className="text-md w-fit accent-gray-600">
                Fatura paga
              </Label>
            </div>

            <Button
              onClick={() => payInvoice({ id: invoice.id })}
              disabled={invoice.paid || isPending}
            >
              Pagar fatura com saldo da conta
            </Button>
          </div>

          <hr />
        </div>

        <div className="flex max-h-[70%] justify-around gap-10">
          <PurchasesList invoiceId={invoice.id} />

          <BudgetsList invoiceId={invoice.id} />

          <PurchasesGraph invoiceId={invoice.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
