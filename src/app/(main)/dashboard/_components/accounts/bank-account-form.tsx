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
import React, { useState } from 'react';
import { CreateBankAccountParams } from '~/procedure-params/bank-account-params';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '~/app/_components/ui/dialog';
import { PlusCircle } from 'lucide-react';

type CreateBankAccountInput = z.infer<typeof CreateBankAccountParams>;

export const BankAccountForm = () => {
  const form = useForm<CreateBankAccountInput>({
    resolver: zodResolver(CreateBankAccountParams),
    mode: 'all',
    defaultValues: {
      name: '',
      balance: 0,
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: createAccount, isPending } =
    api.bankAccounts.create.useMutation({
      onSuccess: () => {
        form.reset();
        setDialogOpen(false);
      },
    });

  const onSubmit = form.handleSubmit((data) => createAccount(data));

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PlusCircle color="green" />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col">
        <DialogTitle>Nova conta</DialogTitle>
        <DialogClose />

        <Form {...form}>
          <form className="flex h-fit flex-col gap-3" onSubmit={onSubmit}>
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
                      placeholder="Insira o saldo da conta"
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
      </DialogContent>
    </Dialog>
  );
};
