'use client';

import ReactECharts from 'echarts-for-react';
import { getRiderWeekSummary } from '@/lib/data';
import type { RiderWeekData } from '@/lib/data';
import { ECHART_COLORS } from '@/lib/config';

interface Props {
  data: RiderWeekData;
  district: string;
}

export function RiderWeekChart({ data, district }: Props) {
  const result = getRiderWeekSummary(data, district);

  if (result.length === 0) {
    return <div className="text-center text-muted-foreground py-8">暂无数据</div>;
  }

  const labels = ['活跃骑手', '总骑手'];

  const option = {
    tooltip: {
      trigger: 'axis' as const,
    },
    legend: {
      data: labels,
      top: 0,
      textStyle: { fontSize: 10 },
    },
    grid: { top: 40, right: 20, bottom: 30, left: 50 },
    xAxis: {
      type: 'category' as const,
      data: result.map(r => r.date),
      axisLabel: { fontSize: 9, rotate: 20 },
    },
    yAxis: {
      type: 'value' as const,
      name: '人数',
      axisLabel: { fontSize: 10 },
    },
    series: labels.map((label, idx) => ({
      name: label,
      type: 'line' as const,
      data: result.map(r => r.values[idx] || 0),
      smooth: true,
      symbol: 'circle',
      symbolSize: 4,
      itemStyle: { color: ECHART_COLORS[idx] },
      lineStyle: { width: 2 },
    })),
  };

  return <ReactECharts option={option} style={{ height: 280 }} />;
}
