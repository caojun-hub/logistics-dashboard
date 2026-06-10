'use client';

import ReactECharts from 'echarts-for-react';
import { getImperfBizDaily } from '@/lib/data';
import type { ImperfBiz } from '@/lib/data';

interface Props {
  data: ImperfBiz;
  district: string;
  month: string;
}

export function ImperfBizChart({ data, district, month }: Props) {
  const result = getImperfBizDaily(data, district, month);

  if (result.length === 0) {
    return <div className="text-center text-muted-foreground py-8">暂无数据</div>;
  }

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: any) => {
        const idx = params[0]?.dataIndex;
        if (idx === undefined) return '';
        const d = result[idx];
        return `${d.date}<br/>总单: <b>${d.total.toLocaleString()}</b><br/>异常: <b>${d.imperf}</b><br/>异常率: <b>${d.rate}%</b>`;
      },
    },
    legend: {
      data: ['异常率', '异常量'],
      top: 0,
      textStyle: { fontSize: 10 },
    },
    grid: { top: 40, right: 40, bottom: 30, left: 60 },
    xAxis: {
      type: 'category' as const,
      data: result.map(r => r.date.slice(-2)),
      axisLabel: { fontSize: 10 },
      name: '日',
    },
    yAxis: [
      {
        type: 'value' as const,
        name: '异常量',
        axisLabel: { fontSize: 10 },
      },
      {
        type: 'value' as const,
        name: '异常率(%)',
        axisLabel: { fontSize: 10 },
      },
    ],
    series: [
      {
        name: '异常量',
        type: 'bar' as const,
        data: result.map(r => r.imperf),
        itemStyle: { color: '#ee6666' },
        barMaxWidth: 20,
      },
      {
        name: '异常率',
        type: 'line' as const,
        yAxisIndex: 1,
        data: result.map(r => r.rate),
        smooth: true,
        itemStyle: { color: '#5470c6' },
        lineStyle: { width: 2 },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 320 }} />;
}
