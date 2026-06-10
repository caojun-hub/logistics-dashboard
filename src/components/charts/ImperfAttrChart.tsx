'use client';

import ReactECharts from 'echarts-for-react';
import { getImperfAttrDaily } from '@/lib/data';
import type { ImperfAttr } from '@/lib/data';

interface Props {
  data: ImperfAttr;
  district: string;
  month: string;
}

export function ImperfAttrChart({ data, district, month }: Props) {
  const result = getImperfAttrDaily(data, district, month);

  if (result.length === 0) {
    return <div className="text-center text-muted-foreground py-8">暂无数据</div>;
  }

  const option = {
    tooltip: {
      trigger: 'axis' as const,
    },
    legend: {
      data: ['异常率', '物流占比', '商户占比', '用户占比'],
      top: 0,
      textStyle: { fontSize: 10 },
    },
    grid: { top: 40, right: 20, bottom: 30, left: 50 },
    xAxis: {
      type: 'category' as const,
      data: result.map(r => r.date.slice(-2)),
      axisLabel: { fontSize: 10 },
      name: '日',
    },
    yAxis: {
      type: 'value' as const,
      name: '%',
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: '异常率',
        type: 'line' as const,
        data: result.map(r => r.imperfRate),
        smooth: true,
        itemStyle: { color: '#ee6666' },
        lineStyle: { width: 2 },
      },
      {
        name: '物流占比',
        type: 'bar' as const,
        stack: 'pct',
        data: result.map(r => r.logisticsPct),
        itemStyle: { color: '#5470c6' },
        barMaxWidth: 20,
      },
      {
        name: '商户占比',
        type: 'bar' as const,
        stack: 'pct',
        data: result.map(r => r.merchantPct),
        itemStyle: { color: '#91cc75' },
        barMaxWidth: 20,
      },
      {
        name: '用户占比',
        type: 'bar' as const,
        stack: 'pct',
        data: result.map(r => r.userPct),
        itemStyle: { color: '#fac858' },
        barMaxWidth: 20,
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 320 }} />;
}
