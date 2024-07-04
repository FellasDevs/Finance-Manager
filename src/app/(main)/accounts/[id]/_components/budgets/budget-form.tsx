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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '~/app/_components/ui/dialog';
import { Pencil, PlusCircle } from 'lucide-react';
import { PurchaseCategorySelect } from '~/app/(main)/accounts/[id]/_components/purchase-categories/purchase-category-select';
import { type Budget } from '~/app/(main)/accounts/[id]/_components/budgets/budget-card';
import { CreateBudgetParams } from '~/procedure-params/create-budget-params';

type Props = {
  invoiceId: string;
  createdBudget?: Budget;
};

export function BudgetForm(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          {props.createdBudget ? (
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

type CreateBudgetInput = z.input<typeof CreateBudgetParams>;

function FormComponent({
  invoiceId,
  createdBudget,
  closeModal,
}: FormComponentProps) {
  const form = useForm<CreateBudgetInput>({
    resolver: zodResolver(CreateBudgetParams),
    mode: 'all',
    defaultValues: createdBudget || {
      invoiceId,
      value: 0,
      categoryId: '',
    },
  });

  const { mutate: createBudget, isPending: createPending } =
    api.budgets.create.useMutation({
      onSuccess: closeModal,
    });

  const { mutate: editBudget, isPending: editPending } =
    api.budgets.edit.useMutation({
      onSuccess: closeModal,
    });

  const isPending = useMemo(
    () => createPending || editPending,
    [createPending, editPending],
  );

  const onSubmit = form.handleSubmit((values) =>
    createdBudget ? editBudget(values) : createBudget(values),
  );

  return (
    <Form {...form}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <span className="text-2xl font-bold">
          {createdBudget ? 'Editar ' : 'Novo '} orçamento
        </span>

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

        {!createdBudget && (
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
        )}

        <Button
          type="submit"
          isLoading={isPending}
          disabled={isPending}
          variant="outline"
        >
          {createdBudget ? 'Editar ' : 'Criar '} orçamento
        </Button>
      </form>
    </Form>
  );
}
