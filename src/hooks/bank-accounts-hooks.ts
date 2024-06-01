import { api } from '~/trpc/react';
import { useUserStore } from '~/stores/user-store';

export const useBankAccounts = () => {
  const { userId } = useUserStore();

  const accountsQuery = api.bankAccounts.getByUserId.useQuery(
    { userId },
    { staleTime: Infinity },
  );

  const createAccountMutation = api.bankAccounts.create.useMutation({
    onSuccess: () => accountsQuery.refetch(),
  });

  return { accountsQuery, createAccountMutation };
};
