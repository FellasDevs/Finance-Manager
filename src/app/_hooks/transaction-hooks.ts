import { api } from '~/trpc/react';

export const useTransactions = (accountId: string) => {
  const transactionsQuery = api.transactions.getByAccountId.useQuery(
    { accountId },
    { staleTime: Infinity },
  );

  const createTransactionMutation = api.transactions.create.useMutation({
    onSuccess: () => transactionsQuery.refetch(),
  });

  const deleteTransactionMutation = api.transactions.delete.useMutation({
    onSuccess: () => transactionsQuery.refetch(),
  });

  return {
    transactionsQuery,
    createTransactionMutation,
    deleteTransactionMutation,
  };
};
