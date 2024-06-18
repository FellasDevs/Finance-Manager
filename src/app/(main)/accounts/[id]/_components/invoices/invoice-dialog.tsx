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

export function InvoiceDialog({ invoice }: InvoiceCardProps) {
  const { data: purchases, error } = api.purchases.getByInvoice.useQuery({
    invoiceId: invoice.id,
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full">Ver mais</Button>
      </DialogTrigger>

      <DialogContent>
        <div className="flex h-[80vh] flex-col gap-2 px-4 py-1 text-center text-lg font-semibold">
          <InvoiceHeader invoice={invoice} />

          {!error && purchases?.length && (
            <div className="flex max-h-[80%] flex-col gap-2 overflow-auto rounded-lg p-3 text-start shadow-lg">
              {purchases.map((purchase) => (
                <PurchaseCard purchase={purchase} key={purchase.id} />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
