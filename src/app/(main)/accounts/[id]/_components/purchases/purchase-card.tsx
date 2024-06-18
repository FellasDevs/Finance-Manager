'use client';

import { type InferRouteOutput } from '~/utils/types';
import { type FC } from 'react';
import { parseMoney } from '~/utils/parseMoney';
import { api } from '~/trpc/react';
import { Button } from '~/app/_components/ui/button';
import { FaTrash } from 'react-icons/fa';

type Props = {
  purchase: InferRouteOutput['purchases']['getByInvoice'][0];
};

export const PurchaseCard: FC<Props> = ({ purchase }) => {
  const { mutate: deletePurchase, isPending } =
    api.purchases.delete.useMutation();

  return (
    <div className="flex justify-between rounded-lg p-3 shadow-lg">
      <div>
        <p className="mb-2 text-xl font-bold">{parseMoney(purchase.value)}</p>
        <p className="truncate text-lg font-semibold">{purchase.description}</p>
      </div>

      <Button
        onClick={() => deletePurchase({ id: purchase.id })}
        disabled={isPending}
        variant="ghost"
        size="icon"
      >
        <FaTrash size={24} color="red" />
      </Button>
    </div>
  );
};
