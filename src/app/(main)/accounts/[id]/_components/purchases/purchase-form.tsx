'use client';

import React, { type FC, useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '~/app/_components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import { PurchaseCategorySelect } from '~/app/(main)/accounts/[id]/_components/purchase-categories/purchase-category-select';
import { CreatePurchaseParams } from '~/procedure-params/purchases-params';

type Props = {
  invoiceId: string;
};

type CreatePurchaseInput = z.input<typeof CreatePurchaseParams>;

export const PurchaseForm: FC<Props> = ({ invoiceId }) => {
  const form = useForm<CreatePurchaseInput>({
    resolver: zodResolver(CreatePurchaseParams),
    mode: 'all',
    defaultValues: {
      invoiceId,
      value: 0,
      description: '',
      time: new Date(),
    },
  });

  const [open, setOpen] = useState(false);

  const { mutate, isPending } = api.purchases.create.useMutation({
    onSuccess: () => setOpen(false),
  });

  const onSubmit = form.handleSubmit((values) => mutate(values));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="ghost" size="icon">
          <PlusCircle color="green" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form className="flex flex-col gap-3" onSubmit={onSubmit}>
            <span className="text-2xl font-bold">Nova Compra</span>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Descrição
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Insira a descrição"
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
                      {...field}
                      type="number"
                      step={0.01}
                      placeholder="Insira o valor"
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Categoria
                    <p className="text-xs font-bold">
                      Digite para criar uma nova categoria
                    </p>
                  </FormLabel>

                  <FormControl>
                    <PurchaseCategorySelect
                      {...form}
                      onChange={(categoryId) =>
                        form.setValue('categoryId', categoryId as string)
                      }
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
                      {...field}
                      type="datetime-local"
                      placeholder="Insira o momento em que a compra ocorreu"
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
      </DialogContent>
    </Dialog>
  );
};
