'use client';

import ReactECharts from 'echarts-for-react';
import { getLineAttendanceSummary } from '@/lib/data';
import type { RiderAttendanceMonthly } from '@/lib/data';
import { ECHART_COLORS } from '@/lib/config';

interface Props {
  data: RiderAttendanceMonthly;
  district: string;
  month: string;
}

export function LineAttendanceSummaryChart({ data, district, month }: Props) {
  const result = getLineAttendanceSummary(data, district, month);

  if (result.length === 0) {
    return <div className="text-center text-muted-foreground py-8">暂无数据</div>;
  }

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: any) => {
        const p = params[0];
        return `${result[p.dataIndex].line}<br/>出勤: <b>${p.value}</b>人`;
      },
    },
    grid: { top: 10, right: 20, bottom: 30, left: 50 },
    xAxis: {
      type: 'category' as const,
      data: result.map(r => r.line),
      axisLabel: { fontSize: 10, rotate: 20 },
    },
    yAxis: {
      type: 'value' as const,
      name: '出勤人数',
      axisLabel: { fontSize: 11 },
    },
    series: [
      {
        type: 'bar' as const,
        data: result.map((r, idx) => ({
          value: r.count,
          itemStyle: { color: ECHART_COLORS[idx % ECHART_COLORS.length] },
        })),
        barMaxWidth: 35,
        label: {
          show: true,
          position: 'top' as const,
          formatter: '{c}',
          fontSize: 10,
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 280 }} />;
}