'use client';

import ReactECharts from 'echarts-for-react';
import { getRiderEfficiencyMonthly } from '@/lib/data';
import type { RiderEfficiency } from '@/lib/data';
import { ECHART_COLORS } from '@/lib/config';

interface Props {
  data: RiderEfficiency;
  district: string;
  month: string;
}

export function RiderEfficiencyChart({ data, district, month }: Props) {
  const { summary, trend } = getRiderEfficiencyMonthly(data, district, month);

  if (summary.length === 0) {
    return <div className="text-center text-muted-foreground py-8">暂无数据</div>;
  }

  // Left chart: summary bar chart
  const summaryOption = {
    tooltip: { trigger: 'axis' as const },
    legend: { data: ['日均出勤', '人效(单/人)'], top: 0, textStyle: { fontSize: 11 } },
    grid: { top: 40, right: 50, bottom: 30, left: 60 },
    xAxis: {
      type: 'category' as const,
      data: summary.map(s => s.line),
      axisLabel: { fontSize: 10, rotate: 20 },
    },
    yAxis: [
      { type: 'value' as const, name: '出勤人数', axisLabel: { fontSize: 11 } },
      { type: 'value' as const, name: '单/人', axisLabel: { fontSize: 11 } },
    ],
    series: [
      {
        name: '日均出勤',
        type: 'bar' as const,
        data: summary.map(s => s.avgActive),
        itemStyle: { color: ECHART_COLORS[0] },
        barMaxWidth: 30,
      },
      {
        name: '人效(单/人)',
        type: 'bar' as const,
        yAxisIndex: 1,
        data: summary.map(s => s.avgOrdersPerActive),
        itemStyle: { color: ECHART_COLORS[1] },
        barMaxWidth: 30,
      },
    ],
  };

  // Right chart: efficiency trend lines
  const lines = summary.map(s => s.line);
  const trendOption = {
    tooltip: { trigger: 'axis' as const },
    legend: { data: lines, top: 0, textStyle: { fontSize: 9 }, type: 'scroll' as const },
    grid: { top: 40, right: 20, bottom: 30, left: 40 },
    xAxis: {
      type: 'category' as const,
      data: trend.map(t => t.date.slice(-2)),
      axisLabel: { fontSize: 11 },
      name: '日',
    },
    yAxis: {
      type: 'value' as const,
      name: '单/人',
      axisLabel: { fontSize: 11 },
    },
    series: lines.map((line, idx) => ({
      name: line,
      type: 'line' as const,
      smooth: true,
      symbol: 'none',
      lineStyle: { width: 2 },
      itemStyle: { color: ECHART_COLORS[idx % ECHART_COLORS.length] },
      data: trend.map(t => t.data[line]?.ordersPerActive ?? null),
    })),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ReactECharts option={summaryOption} style={{ height: 280 }} />
      <ReactECharts option={trendOption} style={{ height: 280 }} />
    </div>
  );
}