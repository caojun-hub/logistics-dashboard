'use client';

import ReactECharts from 'echarts-for-react';
import { getRiderQualityTrend } from '@/lib/data';
import type { RiderQualityCum } from '@/lib/data';
import { ECHART_COLORS } from '@/lib/config';

interface Props {
  data: RiderQualityCum;
  district: string;
  month: string;
}

export function RiderQualityChart({ data, district, month }: Props) {
  const result = getRiderQualityTrend(data, district, month);

  if (result.length === 0) {
    return <div className="text-center text-muted-foreground py-8">暂无数据</div>;
  }

  const labels = ['活跃骑手', '总骑手', '异常骑手', '超时骑手'];

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
      data: result.map(r => r.date.slice(-2)),
      axisLabel: { fontSize: 10 },
      name: '日',
    },
    yAxis: {
      type: 'value' as const,
      axisLabel: { fontSize: 10 },
    },
    series: labels.map((label, idx) => ({
      name: label,
      type: idx < 2 ? 'line' as const : 'bar' as const,
      data: result.map(r => r.values[idx] || 0),
      smooth: idx < 2,
      itemStyle: { color: ECHART_COLORS[idx] },
      lineStyle: idx < 2 ? { width: 2 } : undefined,
      barMaxWidth: idx >= 2 ? 15 : undefined,
    })),
  };

  return <ReactECharts option={option} style={{ height: 320 }} />;
}
