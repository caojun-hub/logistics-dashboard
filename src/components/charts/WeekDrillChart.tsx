'use client';

import ReactECharts from 'echarts-for-react';
import { getDrillBizSummary } from '@/lib/data';
import type { WeekDrillData } from '@/lib/data';
import { ECHART_COLORS } from '@/lib/config';

interface Props {
  data: WeekDrillData;
  district: string;
  weekDate?: string;
}

export function WeekDrillChart({ data, district, weekDate }: Props) {
  const result = getDrillBizSummary(data as any, district, weekDate);

  if (result.length === 0) {
    return <div className="text-center text-muted-foreground py-8">暂无数据</div>;
  }

  const allBizareas = result[0]?.bizareas || [];

  const option = {
    tooltip: {
      trigger: 'axis' as const,
    },
    legend: {
      type: 'scroll' as const,
      top: 0,
      textStyle: { fontSize: 10 },
    },
    grid: { top: 40, right: 20, bottom: 30, left: 80 },
    xAxis: {
      type: 'category' as const,
      data: allBizareas.map(a => a.name),
      axisLabel: { fontSize: 9, rotate: 30 },
    },
    yAxis: {
      type: 'value' as const,
      name: '推单量',
      axisLabel: { fontSize: 10 },
    },
    series: result.map((r, idx) => ({
      name: r.biz,
      type: 'bar' as const,
      stack: 'total',
      data: r.bizareas.map(a => a.total),
      itemStyle: { color: ECHART_COLORS[idx % ECHART_COLORS.length] },
      barMaxWidth: 30,
    })),
  };

  return <ReactECharts option={option} style={{ height: 320 }} />;
}