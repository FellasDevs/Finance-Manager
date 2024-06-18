'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '~/app/_components/ui/dialog';
import { Button } from '~/app/_components/ui/button';
import { type InvoiceCardProps } from '~/app/(main)/accounts/[id]/_components/invoices/invoice-card';
import { api } from '~/trpc/react';
import { getMonth } from '~/utils/date-utils';
import dayjs from 'dayjs';
import { parseMoney } from '~/utils/parseMoney';

export function InvoiceDialog({ invoice }: InvoiceCardProps) {
  // PEGAR COMPRAS PRA ESSE INVOICE
  // const {} = api.

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full">Ver mais</Button>
      </DialogTrigger>

      <DialogContent>
        <div className="flex h-[80vh] flex-col justify-between px-4 py-1 text-center text-lg font-semibold capitalize">
          <div className="flex flex-col gap-1">
            <p>
              {getMonth(invoice.dueDate)} de {dayjs(invoice.dueDate).year()}
            </p>

            <p>
              {parseMoney(invoice.value)} / {parseMoney(invoice.lim)}
            </p>
          </div>

          <div className="flex max-h-[80%] flex-col gap-2 overflow-auto rounded-lg p-3 text-start shadow-lg">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i}>Compra braba no valor de {parseMoney(1000)}</div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
