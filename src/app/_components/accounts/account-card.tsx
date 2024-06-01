import { type FC } from 'react';
import { type InferRouteOutput } from '~/utils/types';
import Link from 'next/link';
import { Button } from '~/components/ui/button';

type Account = InferRouteOutput['bankAccounts']['getByUserId'][0];

type Props = {
  account: Account;
  hideLink?: boolean;
};

export const AccountCard: FC<Props> = ({ account, hideLink }) => {
  return (
    <div className="flex items-center justify-between gap-10 rounded bg-slate-200 px-5 py-3 shadow-lg ">
      <div>
        <p className="text-lg">
          Nome: <b>{account.name}</b>
        </p>

        <p>Valor: R$ {account.balance}</p>
      </div>

      {!hideLink && (
        <Link href={account.id} passHref>
          <Button>Ver mais</Button>
        </Link>
      )}
    </div>
  );
};
