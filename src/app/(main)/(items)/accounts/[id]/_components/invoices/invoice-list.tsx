'use client';

import { InvoiceCard } from '~/app/(main)/(items)/accounts/[id]/_components/invoices/invoice-card';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/app/_components/ui/carousel';
import { type InvoicesRouteOutput } from '~/app/(main)/(items)/accounts/[id]/_components/invoices/invoices-container';
import { Card } from '~/app/_components/ui/card';

type Props = {
  invoices: InvoicesRouteOutput;
};

export function InvoiceList({ invoices }: Props) {
  return (
    <Card className="mx-10 h-fit w-[25em] p-2">
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
    </Card>
  );
}
