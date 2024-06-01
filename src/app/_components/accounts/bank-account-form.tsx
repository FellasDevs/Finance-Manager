import { useBankAccounts } from '~/hooks/bank-accounts-hooks';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export const BankAccountForm = () => {
  const {
    createAccountMutation: { mutateAsync, isPending },
  } = useBankAccounts();

  return (
    <form
      className="flex h-fit w-[25em] flex-col gap-3 rounded p-3 shadow-lg"
      onSubmit={async (e) => {
        e.preventDefault();

        const target = e.target as HTMLFormElement;
        const values = new FormData(target);

        try {
          await mutateAsync({
            name: values.get('name') as string,
            balance: Number(values.get('balance')),
            userId: '4f1065de-2d7e-4892-a493-99969a64acab',
          });

          target.reset();
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <span className="text-2xl font-bold">Nova conta</span>

      <Input type="text" placeholder="Nome" name="name" maxLength={50} />

      <Input type="number" step={0.01} placeholder="Saldo" name="balance" />

      <Button type="submit" disabled={isPending} variant="outline">
        Criar
      </Button>
    </form>
  );
};
