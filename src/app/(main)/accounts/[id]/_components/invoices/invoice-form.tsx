'use client';

import React, { type FC } from 'react';
import { Input } from '~/app/_components/ui/input';
import { Button } from '~/app/_components/ui/button';
import { api } from '~/trpc/react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/app/_components/ui/form';
import dayjs from 'dayjs';
import { CreateInvoiceParams } from '~/procedure-params/invoices-params';

type Props = {
  accountId: string;
  onSuccess?: () => void;
};

type CreateInvoiceInput = z.input<typeof CreateInvoiceParams>;

export const InvoiceForm: FC<Props> = ({ accountId, onSuccess }) => {
  const form = useForm<CreateInvoiceInput>({
    resolver: zodResolver(CreateInvoiceParams),
    mode: 'onTouched',
    defaultValues: {
      accountId,
      value: 0,
      lim: 0,
      dueDate: new Date(),
    },
  });

  const { mutate, isPending } = api.invoices.create.useMutation({ onSuccess });

  const onSubmit = form.handleSubmit((values) => mutate(values));

  return (
    <Form {...form}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <span className="text-2xl font-bold">Nova fatura</span>

        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Valor</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  step={0.01}
                  placeholder="Insira o valor"
                  {...field}
                  onChange={(e) =>
                    form.setValue('value', Number(e.target.value))
                  }
                  autoComplete="on"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lim"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Limite</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  step={0.01}
                  placeholder="Insira o limite"
                  {...field}
                  onChange={(e) => form.setValue('lim', Number(e.target.value))}
                  autoComplete="on"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Data</FormLabel>

              <FormControl>
                <Input
                  type="datetime-local"
                  placeholder="Insira o momento em que a transação ocorreu"
                  {...field}
                  value={dayjs(field.value).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) =>
                    form.setValue('dueDate', dayjs(e.target.value).toDate())
                  }
                  autoComplete="on"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} variant="outline">
          Criar
        </Button>
      </form>
    </Form>
  );
};
