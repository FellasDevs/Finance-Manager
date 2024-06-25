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

export function InvoiceDialog({ invoice }: InvoiceCardProps) {
  const { data: purchases, error } = api.purchases.getByInvoice.useQuery({
    invoiceId: invoice.id,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Ver mais</Button>
      </DialogTrigger>

      <DialogContent className="h-[85vh]">
        <InvoiceHeader invoice={invoice} />

        <div className="rounded-lg p-3 shadow-lg">
          <div className="mb-3 flex justify-between">
            <p className="text-2xl font-bold">Compras</p>

            <PurchaseForm invoiceId={invoice.id} />
          </div>

          {error || !purchases?.length ? (
            'Não há compras registradas nessa fatura'
          ) : (
            <div className="flex max-h-[55%] flex-col gap-2 overflow-auto rounded-lg p-2">
              {[...purchases, ...purchases, ...purchases].map((purchase) => (
                <PurchaseCard purchase={purchase} key={purchase.id} />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
