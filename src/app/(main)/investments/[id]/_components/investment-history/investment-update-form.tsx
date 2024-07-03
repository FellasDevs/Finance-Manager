'use client';

import React, { useMemo, useState } from 'react';
import { Input } from '~/app/_components/ui/input';
import { Button } from '~/app/_components/ui/button';
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
import dayjs from 'dayjs';
import { CreateInvestmentUpdateParams } from '~/procedure-params/investments-history-params';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '~/app/_components/ui/dialog';
import { Pencil, PlusCircle } from 'lucide-react';
import { type InvestmentUpdate } from '~/app/(main)/investments/[id]/_components/investment-history/investment-update-card';

type Props = {
  investmentId: string;
  createdInvestmentUpdate?: InvestmentUpdate;
};

type InvestmentUpdateInput = z.input<typeof CreateInvestmentUpdateParams>;

export function InvestmentUpdateForm({
  investmentId,
  createdInvestmentUpdate,
}: Props) {
  const form = useForm<InvestmentUpdateInput>({
    resolver: zodResolver(CreateInvestmentUpdateParams),
    mode: 'all',
    defaultValues: createdInvestmentUpdate || {
      investmentId,
      value: 0,
      time: new Date(),
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: createInvestment, isPending: createPending } =
    api.investmentsHistory.create.useMutation({
      onSuccess: () => setDialogOpen(false),
    });

  const { mutate: editInvestment, isPending: editPending } =
    api.investmentsHistory.update.useMutation({
      onSuccess: () => setDialogOpen(false),
    });

  const isPending = useMemo(
    () => createPending || editPending,
    [createPending, editPending],
  );

  const onSubmit = form.handleSubmit((data) =>
    createdInvestmentUpdate
      ? editInvestment({ ...data, id: createdInvestmentUpdate.id })
      : createInvestment(data),
  );

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          {createdInvestmentUpdate ? (
            <Pencil color="blue" size={18} />
          ) : (
            <PlusCircle color="green" />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form className="flex flex-col gap-3" onSubmit={onSubmit}>
            <span className="text-2xl font-bold">
              Nova atualização no investimento
            </span>

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
                      placeholder="Insira o novo valor do investimento"
                      className="w-min"
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
                      placeholder="Insira o momento em que a atualização ocorreu"
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

            <Button
              type="submit"
              isLoading={isPending}
              disabled={isPending}
              variant="outline"
            >
              Criar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
