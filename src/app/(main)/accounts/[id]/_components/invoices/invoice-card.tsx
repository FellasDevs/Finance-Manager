import { type FC } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import { Button } from '~/app/_components/ui/button';
import Link from 'next/link';
import { getMonth } from '~/utils/date-utils';
import { parseMoney } from '~/utils/parseMoney';
import dayjs from 'dayjs';

type Props = {
  invoice: InferRouteOutput['invoices']['getByAccountId'][0];
};

export const InvoiceCard: FC<Props> = ({ invoice }) => {
  return (
    <div className="flex h-[10em] flex-col justify-around rounded-lg px-4 py-1 text-center text-lg font-semibold capitalize shadow-lg">
      <p>
        {getMonth(invoice.dueDate)} de {dayjs(invoice.dueDate).year()}
      </p>

      <p>
        {parseMoney(invoice.value)} / {parseMoney(invoice.lim)}
      </p>

      <Link href={'/invoices/' + invoice.id} passHref>
        <Button className="w-full">Ver mais</Button>
      </Link>
    </div>
  );
};
