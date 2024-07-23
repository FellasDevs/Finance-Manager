'use client';

import Chart from 'react-apexcharts';
import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { Card } from '~/app/_components/ui/card';
import { type InvoicesRouteOutput } from '~/app/(main)/(items)/accounts/[id]/_components/invoices/invoices-container';

type Props = {
  invoices: InvoicesRouteOutput;
};

export function InvoicesGraph({ invoices }: Props) {
  const series = useMemo(
    () => [
      {
        name: 'Valor em reais',
        data: [...invoices].reverse().map((invoice) => ({
          x: dayjs(invoice.dueDate).format('DD/MM/YYYY HH:mm'),
          y: invoice.value,
        })),
      },
    ],
    [invoices],
  );

  return (
    <Card className="flex min-w-[30em] grow flex-col p-3">
      <p className="mb-7 text-2xl font-bold">Histórico de faturas</p>

      <div className="m-auto text-black">
        <Chart
          width={800}
          height={400}
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
    </Card>
  );
}
