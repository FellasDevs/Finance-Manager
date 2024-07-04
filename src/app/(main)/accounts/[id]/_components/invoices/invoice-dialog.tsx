'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '~/app/_components/ui/dialog';
import { Button } from '~/app/_components/ui/button';
import { type InvoiceCardProps } from '~/app/(main)/accounts/[id]/_components/invoices/invoice-card';
import { api } from '~/trpc/react';
import { PurchaseCard } from '~/app/(main)/accounts/[id]/_components/purchases/purchase-card';
import { InvoiceHeader } from '~/app/(main)/accounts/[id]/_components/invoices/invoice-header';
import { PurchaseForm } from '~/app/(main)/accounts/[id]/_components/purchases/purchase-form';
import { Switch } from '~/app/_components/ui/switch';
import { Label } from '~/app/_components/ui/label';
import React, { useMemo } from 'react';
import { PurchaseList } from '~/app/(main)/accounts/[id]/_components/purchases/purchase-list';

export function InvoiceDialog({ invoice }: InvoiceCardProps) {
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

      <DialogContent className="flex h-[95vh] max-w-[90vw] flex-col">
        <div className="mx-auto flex w-full max-w-[30em] flex-col gap-3">
          <InvoiceHeader invoice={invoice} />

          <hr />

          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
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

        <div className="flex max-h-[75%] gap-3">
          <PurchaseList invoiceId={invoice.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
