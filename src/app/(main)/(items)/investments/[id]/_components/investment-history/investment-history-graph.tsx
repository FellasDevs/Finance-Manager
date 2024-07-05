'use client';

import type { InferRouteOutput } from '~/utils/types';
import Chart from 'react-apexcharts';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { api } from '~/trpc/react';

type Props = {
  investmentId: string;
  initialData: InferRouteOutput['investmentsHistory']['getAllByInvestment'];
};

export function InvestmentHistoryGraph({ investmentId, initialData }: Props) {
  const { data: history } = api.investmentsHistory.getAllByInvestment.useQuery(
    { investmentId },
    { initialData },
  );

  const series = useMemo(
    () => [
      {
        name: 'Valor em reais',
        data: history.reverse().map((update) => ({
          x: dayjs(update.time).format('DD/MM/YYYY HH:mm'),
          y: update.value,
        })),
      },
    ],
    [history],
  );

  return (
    <Chart
      width={900}
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
        title: {
          text: 'Histórico de atualizações do investimento',
          align: 'left',
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
  );
}
