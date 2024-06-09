'use client';

import { Button } from '~/app/_components/ui/button';
import { Input } from '~/app/_components/ui/input';
import { api } from '~/trpc/react';
import { type z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/app/_components/ui/form';
import React from 'react';
import { CreateBankAccountSchema } from '~/schemas/bank-account.schema';

type CreateBankAccountInput = z.infer<typeof CreateBankAccountSchema>;

export const BankAccountForm = () => {
  const form = useForm<CreateBankAccountInput>({
    resolver: zodResolver(CreateBankAccountSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      balance: 0,
    },
  });

  const { mutate, isPending } = api.bankAccounts.create.useMutation({
    onSuccess: () => form.reset(),
  });

  const onSubmit = form.handleSubmit((data) => mutate(data));

  return (
    <Form {...form}>
      <form
        className="flex h-fit w-[25em] flex-col gap-3 rounded-lg p-3 shadow-lg"
        onSubmit={onSubmit}
      >
        <span className="text-2xl font-bold">Nova conta</span>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Nome</FormLabel>

              <FormControl>
                <Input
                  placeholder="Insira o nome da conta"
                  {...field}
                  autoComplete="on"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Saldo</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  step={0.01}
                  placeholder="Insira o nome da conta"
                  {...field}
                  onChange={(e) =>
                    form.setValue('balance', parseFloat(e.target.value))
                  }
                  autoComplete="on"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          isLoading={isPending}
          variant="outline"
        >
          Criar conta
        </Button>
      </form>
    </Form>
  );
};
