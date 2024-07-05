'use client';

import { type InvoiceRouteOutput } from '~/app/(main)/(items)/accounts/[id]/_components/invoices/invoice-list';
import { api } from '~/trpc/react';
import { Spinner } from '~/app/_components/ui/spinner';
import Chart from 'react-apexcharts';
import React, { type ReactNode, useMemo } from 'react';
import dayjs from 'dayjs';

type Props = {
  accountId: string;
  initialData: InvoiceRouteOutput;
};

export function InvoicesGraph({ accountId, initialData }: Props) {
  const {
    data: invoices,
    error,
    isPending,
  } = api.invoices.getByAccountId.useQuery({ accountId }, { initialData });

  const series = useMemo(
    () => [
      {
        name: 'Valor em reais',
        data: invoices.reverse().map((invoice) => ({
          x: dayjs(invoice.dueDate).format('DD/MM/YYYY HH:mm'),
          y: invoice.value,
        })),
      },
    ],
    [history],
  );

  return (
    <div className="min-w-[30em] grow rounded-lg p-3 shadow-lg">
      <p className="mb-7 text-2xl font-bold">Histórico de faturas</p>

      <div className="flex flex-col">
        {isPending ? (
          <ErrorMessage>
            <Spinner />
            <p>Carregando...</p>
          </ErrorMessage>
        ) : error ? (
          <ErrorMessage>
            Ocorreu um erro inesperado, recarregue a página para tentar
            novamente
          </ErrorMessage>
        ) : !invoices.length ? (
          <ErrorMessage>
            Os valores não puderam ser carregados, recarregue a página para
            tentar novamente
          </ErrorMessage>
        ) : (
          <div className="m-auto">
            <Chart
              width={800}
              height={500}
              series={series}
              options={{
                chart: {
                  dropShadow: {
                    enabled: true,
                    opacity: 0.2,
                  },
                },
                colors: ['#77B6EA'],
                dataLabels: {
                  enabled: true,
                },
                grid: {
                  borderColor: '#e7e7e7',
                  row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5,
                  },
                },
                markers: {
                  size: 1,
                },
                xaxis: {
                  title: {
                    text: 'Data',
                  },
                },
                yaxis: {
                  title: {
                    text: 'Valor em reais',
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex items-center gap-2 text-xl font-bold">
      {children}
    </div>
  );
}
