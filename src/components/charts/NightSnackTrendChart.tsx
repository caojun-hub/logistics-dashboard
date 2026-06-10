'use client';

import ReactECharts from 'echarts-for-react';
import { getNightSnackTrend } from '@/lib/data';
import type { NightSnackCum } from '@/lib/data';

interface Props {
  data: NightSnackCum;
  district: string;
  month: string;
}

export function NightSnackTrendChart({ data, district, month }: Props) {
  const result = getNightSnackTrend(data, district, month);

  if (result.length === 0) {
    return <div className="text-center text-muted-foreground py-8">暂无数据</div>;
  }

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: any) => `${params[0].name}<br/>妥投率: <b>${params[0].value}%</b>`,
    },
    grid: { top: 20, right: 20, bottom: 30, left: 50 },
    xAxis: {
      type: 'category' as const,
      data: result.map(r => r.date.slice(-2)),
      axisLabel: { fontSize: 10 },
      name: '日',
    },
    yAxis: {
      type: 'value' as const,
      name: '妥投率(%)',
      axisLabel: { fontSize: 10 },
      min: (value: { min: number }) => Math.floor(value.min - 1),
    },
    series: [
      {
        type: 'line' as const,
        data: result.map(r => r.value),
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        itemStyle: { color: '#5470c6' },
        areaStyle: { opacity: 0.15 },
        lineStyle: { width: 2 },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 280 }} />;
}
