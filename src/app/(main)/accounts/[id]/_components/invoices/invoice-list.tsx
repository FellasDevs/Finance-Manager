'use client';

import { api } from '~/trpc/react';
import { type FC, useMemo, useState } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import { InvoiceForm } from '~/app/(main)/accounts/[id]/_components/invoices/invoice-form';
import { InvoiceCard } from '~/app/(main)/accounts/[id]/_components/invoices/invoice-card';
import { Button } from '~/app/_components/ui/button';
import { ArrowLeft, ArrowRight, PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '~/app/_components/ui/dialog';

type Props = {
  accountId: string;
  initialData: InferRouteOutput['invoices']['getByAccountId'];
};

export const InvoiceList: FC<Props> = ({ accountId, initialData }) => {
  const { data: invoices, error } = api.invoices.getByAccountId.useQuery(
    { accountId },
    { initialData },
  );

  const [currentInvoice, setCurrentInvoice] = useState(0);

  const currentInvoiceData = useMemo(
    () => invoices[currentInvoice],
    [currentInvoice, invoices],
  );

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-[30em] rounded p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="m-3 text-2xl font-bold">FATURAS</div>

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger>
            <PlusCircle color="green" />
          </DialogTrigger>

          <DialogContent>
            <InvoiceForm
              accountId={accountId}
              onSuccess={() => setModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex max-h-[80vh] flex-col gap-2 overflow-auto p-5">
        {error || !invoices?.length ? (
          <div className="my-10 text-center text-xl font-bold">
            Não há faturas
          </div>
        ) : (
          <div>
            {invoices.length > 1 && (
              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  disabled={currentInvoice === 0}
                  onClick={() => {
                    if (currentInvoice === 0) return;
                    setCurrentInvoice(currentInvoice - 1);
                  }}
                >
                  <ArrowLeft />
                </Button>

                <Button
                  variant="ghost"
                  disabled={currentInvoice === invoices.length - 1}
                  onClick={() => {
                    if (currentInvoice === invoices.length - 1) return;
                    setCurrentInvoice(currentInvoice + 1);
                  }}
                >
                  <ArrowRight />
                </Button>
              </div>
            )}

            {currentInvoiceData ? (
              <InvoiceCard invoice={currentInvoiceData} />
            ) : (
              <div>Erro!</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
