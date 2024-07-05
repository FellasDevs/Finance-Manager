'use client';

import React, { useMemo, useState } from 'react';
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
import { Pencil, PlusCircle } from 'lucide-react';
import { PurchaseCategorySelect } from '~/app/(main)/(items)/accounts/[id]/_components/purchase-categories/purchase-category-select';
import { CreatePurchaseParams } from '~/procedure-params/purchases-params';
import { type Purchase } from '~/app/(main)/(items)/accounts/[id]/_components/purchases/purchase-card';

type Props = {
  invoiceId: string;
  createdPurchase?: Purchase;
};

export function PurchaseForm(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          {props.createdPurchase ? (
            <Pencil size={20} className="text-blue-500" />
          ) : (
            <PlusCircle className="text-green-500" />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <FormComponent {...props} closeModal={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

type FormComponentProps = Props & {
  closeModal: () => void;
};

type CreatePurchaseInput = z.input<typeof CreatePurchaseParams>;

function FormComponent({
  invoiceId,
  createdPurchase,
  closeModal,
}: FormComponentProps) {
  const form = useForm<CreatePurchaseInput>({
    resolver: zodResolver(CreatePurchaseParams),
    mode: 'all',
    defaultValues: createdPurchase || {
      invoiceId,
      value: 0,
      description: '',
      time: new Date(),
    },
  });

  const { mutate: createPurchase, isPending: createPending } =
    api.purchases.create.useMutation({
      onSuccess: closeModal,
    });

  const { mutate: editPurchase, isPending: editPending } =
    api.purchases.edit.useMutation({
      onSuccess: closeModal,
    });

  const isPending = useMemo(
    () => createPending || editPending,
    [createPending, editPending],
  );

  const onSubmit = form.handleSubmit((values) =>
    createdPurchase
      ? editPurchase({ ...values, id: createdPurchase.id })
      : createPurchase(values),
  );

  return (
    <Form {...form}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <span className="text-2xl font-bold">
          {createdPurchase ? 'Editar ' : 'Nova '} compra
        </span>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Descrição</FormLabel>

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
                  value={field.value}
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

        <Button
          type="submit"
          isLoading={isPending}
          disabled={isPending}
          variant="outline"
        >
          {createdPurchase ? 'Editar ' : 'Criar '} compra
        </Button>
      </form>
    </Form>
  );
}
