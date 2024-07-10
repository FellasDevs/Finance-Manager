'use client';

import { api } from '~/trpc/react';
import { type InferRouteOutput } from '~/utils/types';
import { InvoiceForm } from '~/app/(main)/(items)/accounts/[id]/_components/invoices/invoice-form';
import { InvoiceCard } from '~/app/(main)/(items)/accounts/[id]/_components/invoices/invoice-card';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/app/_components/ui/carousel';

export type InvoicesRouteOutput =
  InferRouteOutput['invoices']['getByAccountId'];

type Props = {
  accountId: string;
  initialData: InvoicesRouteOutput;
};

export function InvoiceList({ accountId, initialData }: Props) {
  const { data: invoices } = api.invoices.getByAccountId.useQuery(
    { accountId },
    { initialData },
  );

  return (
    <div className="w-[30em] rounded-lg p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="m-3 text-2xl font-bold">Faturas</div>

        <InvoiceForm accountId={accountId} />
      </div>

      <InvoicesCarousel invoices={invoices} />
    </div>
  );
}

function InvoicesCarousel({ invoices }: { invoices: InvoicesRouteOutput }) {
  if (!invoices.length)
    return (
      <div className="my-10 text-center text-xl font-bold">Não há faturas</div>
    );

  return (
    <div className="mx-auto my-16 w-[23em] rounded-lg p-2 shadow-lg">
      <Carousel>
        <CarouselContent>
          {invoices.map((invoice) => (
            <CarouselItem key={invoice.id}>
              <InvoiceCard invoice={invoice} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
