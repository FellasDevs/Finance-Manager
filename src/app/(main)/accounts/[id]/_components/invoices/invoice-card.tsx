import { type FC } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import { Button } from '~/app/_components/ui/button';
import Link from 'next/link';

type Props = {
  invoice: InferRouteOutput['invoices']['getByAccountId'][0];
};

export const InvoiceCard: FC<Props> = ({ invoice }) => {
  return (
    <div className="rounded border p-1">
      <p>{new Date(invoice.dueDate).toLocaleDateString()}</p>
      <p>
        {invoice.value} / {invoice.lim}
      </p>

      <Link href={'/invoices/' + invoice.id} passHref>
        <Button>Ver mais</Button>
      </Link>
    </div>
  );
};
