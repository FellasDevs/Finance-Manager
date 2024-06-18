'use client';

import React, { type FC } from 'react';
import { Input } from '~/app/_components/ui/input';
import { Button } from '~/app/_components/ui/button';
import { api } from '~/trpc/react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { CreateInvoiceSchema } from '~/schemas/invoices.schema';
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
import { type CreatePurchaseSchema } from '~/schemas/purchases.schema';

type Props = {
  invoiceId: string;
  onSuccess?: () => void;
};

type CreatePurchaseInput = z.input<typeof CreatePurchaseSchema>;

export const PurchaseForm: FC<Props> = ({ invoiceId, onSuccess }) => {
  const form = useForm<CreatePurchaseInput>({
    resolver: zodResolver(CreateInvoiceSchema),
    mode: 'onTouched',
    defaultValues: {
      invoiceId,
      value: 0,
      description: '',
      time: new Date(),
      categoryId: '',
    },
  });

  const { data: categories } = api.purchaseCategories.getByUser.useQuery();

  const { mutate, isPending } = api.purchases.create.useMutation({ onSuccess });

  const onSubmit = form.handleSubmit((values) => mutate(values));

  return (
    <Form {...form}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <span className="text-2xl font-bold">Nova Compra</span>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Descrição</FormLabel>

              <FormControl>
                <Input
                  placeholder="Insira a descrição"
                  {...field}
                  value={field.value || ''}
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
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Data</FormLabel>

              <FormControl>
                <Input
                  type="datetime-local"
                  placeholder="Insira o momento em que a compra ocorreu"
                  {...field}
                  value={dayjs(field.value).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) =>
                    form.setValue('time', dayjs(e.target.value).toDate())
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
