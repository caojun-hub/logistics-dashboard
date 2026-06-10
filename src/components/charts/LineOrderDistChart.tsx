'use client';

import ReactECharts from 'echarts-for-react';
import { getLineOrderDist } from '@/lib/data';
import type { ChengtuoRatio } from '@/lib/data';
import { ECHART_COLORS } from '@/lib/config';

interface Props {
  data: ChengtuoRatio;
  district: string;
  month: string;
}

export function LineOrderDistChart({ data, district, month }: Props) {
  const result = getLineOrderDist(data, district, month);

  if (result.length === 0) {
    return <div className="text-center text-muted-foreground py-8">暂无数据</div>;
  }

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: any) => {
        const p = params[0];
        const item = result[p.dataIndex];
        return `${item.line}<br/>订单: <b>${item.orders.toLocaleString()}</b><br/>占比: <b>${item.pct}%</b>`;
      },
    },
    grid: { top: 10, right: 80, bottom: 20, left: 80 },
    xAxis: {
      type: 'value' as const,
      axisLabel: { fontSize: 11, formatter: (v: number) => v >= 10000 ? `${v / 10000}万` : v.toLocaleString() },
    },
    yAxis: {
      type: 'category' as const,
      data: result.map(r => r.line),
      axisLabel: { fontSize: 11 },
    },
    series: [
      {
        type: 'bar' as const,
        data: result.map((r, idx) => ({
          value: r.orders,
          itemStyle: { color: ECHART_COLORS[idx % ECHART_COLORS.length] },
        })),
        barMaxWidth: 25,
        label: {
          show: true,
          position: 'right' as const,
          formatter: (params: any) => `${result[params.dataIndex].pct}%`,
          fontSize: 11,
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 280 }} />;
}