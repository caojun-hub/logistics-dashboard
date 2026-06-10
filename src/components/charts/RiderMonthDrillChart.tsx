'use client';

import ReactECharts from 'echarts-for-react';
import { getRiderMonthDrillSummary } from '@/lib/data';
import type { RiderMonthDrill } from '@/lib/data';
import { ECHART_COLORS } from '@/lib/config';

interface Props {
  data: RiderMonthDrill;
  district: string;
  month: string;
}

export function RiderMonthDrillChart({ data, district, month }: Props) {
  const result = getRiderMonthDrillSummary(data, district, month);

  if (result.length === 0) {
    return <div className="text-center text-muted-foreground py-8">暂无数据</div>;
  }

  const allLines = new Set<string>();
  for (const r of result) {
    for (const l of r.lines) {
      allLines.add(l.name);
    }
  }
  const lineList = Array.from(allLines).sort();

  const option = {
    tooltip: {
      trigger: 'axis' as const,
    },
    legend: {
      data: lineList,
      top: 0,
      textStyle: { fontSize: 10 },
      type: 'scroll' as const,
    },
    grid: { top: 40, right: 20, bottom: 40, left: 80 },
    xAxis: {
      type: 'value' as const,
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: 'category' as const,
      data: result.map(r => r.bizarea),
      axisLabel: { fontSize: 9 },
    },
    series: lineList.map((line, idx) => ({
      name: line,
      type: 'bar' as const,
      stack: 'total',
      data: result.map(r => {
        const found = r.lines.find(l => l.name === line);
        return found ? (found.metrics[0] || 0) : 0;
      }),
      itemStyle: { color: ECHART_COLORS[idx % ECHART_COLORS.length] },
      barMaxWidth: 20,
    })),
  };

  return <ReactECharts option={option} style={{ height: 320 }} />;
}
