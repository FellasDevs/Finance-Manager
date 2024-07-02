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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '~/app/_components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import { CreateInvestmentParams } from '~/procedure-params/investments-params';

type CreateInvestmentInput = z.infer<typeof CreateInvestmentParams>;

export const InvestmentsForm = () => {
  const form = useForm<CreateInvestmentInput>({
    resolver: zodResolver(CreateInvestmentParams),
    mode: 'all',
    defaultValues: {
      name: '',
      value: 0,
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: createInvestment, isPending } =
    api.investments.create.useMutation({
      onSuccess: () => {
        form.reset();
        setDialogOpen(false);
      },
    });

  const onSubmit = form.handleSubmit((data) => createInvestment(data));

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PlusCircle color="green" />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col">
        <DialogTitle>Novo investimento</DialogTitle>
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

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Valor investido
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      step={0.01}
                      placeholder="Insira o valor investido"
                      {...field}
                      onChange={(e) =>
                        form.setValue('value', parseFloat(e.target.value))
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
              Criar investimento
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
