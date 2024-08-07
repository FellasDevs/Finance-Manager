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
import React, { useMemo, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '~/app/_components/ui/dialog';
import { Pencil, PlusCircle } from 'lucide-react';
import { CreateInvestmentParams } from '~/procedure-params/investments-params';
import { type Investment } from '~/app/(main)/dashboard/_components/investments/investment-card';

type CreateInvestmentInput = z.infer<typeof CreateInvestmentParams>;

type Props = {
  originalInvestment?: Investment;
};

export const InvestmentsForm = ({ originalInvestment }: Props) => {
  const form = useForm<CreateInvestmentInput>({
    resolver: zodResolver(CreateInvestmentParams),
    mode: 'all',
    defaultValues: originalInvestment || {
      name: '',
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: createInvestment, isPending: isCreationPending } =
    api.investments.create.useMutation({
      onSuccess: () => {
        form.reset();
        setDialogOpen(false);
      },
    });

  const { mutate: updateInvestment, isPending: isUpdatePending } =
    api.investments.update.useMutation({
      onSuccess: () => {
        form.reset();
        setDialogOpen(false);
      },
    });

  const isPending = useMemo(
    () => isCreationPending || isUpdatePending,
    [isCreationPending, isUpdatePending],
  );

  const onSubmit = form.handleSubmit((data) =>
    originalInvestment
      ? updateInvestment({ ...originalInvestment, ...data })
      : createInvestment(data),
  );

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          {originalInvestment ? (
            <Pencil size={18} className="text-blue-500" />
          ) : (
            <PlusCircle className="text-green-500" />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col">
        <DialogTitle>
          {originalInvestment ? 'Editar ' : 'Novo '} investimento
        </DialogTitle>
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
                      placeholder="Insira o nome do investimento"
                      {...field}
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
              {originalInvestment ? 'Editar ' : 'Criar '} investimento
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
