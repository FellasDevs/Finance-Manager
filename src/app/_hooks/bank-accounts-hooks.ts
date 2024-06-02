import { api } from '~/trpc/react';
import { useUserStore } from '~/app/_stores/user-store';

export const useBankAccounts = () => {
  const { userId } = useUserStore();

  const accountsQuery = api.bankAccounts.getByUserId.useQuery(
    { userId },
    { staleTime: Infinity },
  );

  const createAccountMutation = api.bankAccounts.create.useMutation({
    onSuccess: () => accountsQuery.refetch(),
  });

  const deleteAccountMutation = api.bankAccounts.delete.useMutation({
    onSuccess: () => accountsQuery.refetch(),
  });

  const editAccountMutation = api.bankAccounts.edit.useMutation({
    onSuccess: () => accountsQuery.refetch(),
  });

  return {
    accountsQuery,
    createAccountMutation,
    deleteAccountMutation,
    editAccountMutation,
  };
};
