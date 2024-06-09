import { api } from '~/trpc/server';

type Props = {
  params: { id: string };
};

export default async function InvoicePage({ params: { id } }: Props) {
  try {
    const invoice = await api.invoices.getById({ id });

    return <div>{invoice?.value || 'nope'}</div>;
  } catch (e) {
    return <div>erro</div>;
  }
}
