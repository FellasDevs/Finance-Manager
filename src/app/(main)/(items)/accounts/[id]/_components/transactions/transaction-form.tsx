'use client';

import React, { type FC, useState } from 'react';
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
import { CreateTransactionParams } from '~/procedure-params/transactions-params';
import { Switch } from '~/app/_components/ui/switch';
import { Label } from '~/app/_components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '~/app/_components/ui/dialog';
import { PlusCircle } from 'lucide-react';

type Props = {
  accountId: string;
};

type CreateTransactionInput = z.input<typeof CreateTransactionParams>;

export const TransactionForm: FC<Props> = ({ accountId }) => {
  const form = useForm<CreateTransactionInput>({
    resolver: zodResolver(CreateTransactionParams),
    mode: 'onTouched',
    defaultValues: {
      accountId,
      value: 0,
      description: '',
      time: new Date(),
    },
  });

  const [isReceiving, setIsReceiving] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const { mutate, isPending } = api.transactions.create.useMutation({
    onSuccess: () => setModalOpen(false),
  });

  const onSubmit = form.handleSubmit((data) => {
    let value = data.value ?? 0;

    if (!isReceiving) value = -value;

    mutate({ ...data, value });
  });

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger>
        <PlusCircle color="green" />
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form className="flex flex-col gap-3" onSubmit={onSubmit}>
            <span className="text-2xl font-bold">Nova transação</span>

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
                      placeholder="Insira a descrição da transação"
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
                  <FormLabel className="text-muted-foreground">Valor</FormLabel>

                  <FormControl>
                    <div className="flex items-center justify-between gap-2">
                      <Input
                        type="number"
                        step={0.01}
                        placeholder="Insira o valor da transação"
                        className="w-min"
                        {...field}
                        onChange={(e) =>
                          form.setValue('value', Number(e.target.value))
                        }
                        autoComplete="on"
                      />

                      <div className="flex items-center gap-2">
                        <Switch
                          id="receiving"
                          checked={isReceiving}
                          onCheckedChange={setIsReceiving}
                        />

                        <Label
                          htmlFor="receiving"
                          className="text-md w-fit accent-gray-600"
                        >
                          Transação recebida
                        </Label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*<FormField*/}
            {/*  control={form.control}*/}
            {/*  name="category"*/}
            {/*  render={({ field }) => (*/}
            {/*    <FormItem>*/}
            {/*      <FormLabel className="text-muted-foreground">Categoria</FormLabel>*/}

            {/*      <FormControl>*/}
            {/*        <Input*/}
            {/*          type="number"*/}
            {/*          step={0.01}*/}
            {/*          placeholder="Insira o valor da transação"*/}
            {/*          {...field}*/}
            {/*          autoComplete="on"*/}
            {/*        />*/}
            {/*      </FormControl>*/}
            {/*      <FormMessage />*/}
            {/*    </FormItem>*/}
            {/*  )}*/}
            {/*/>*/}

            <FormField
              control={form.control}
              name="time"
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
};
