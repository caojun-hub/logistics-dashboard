'use client';

import ReactECharts from 'echarts-for-react';
import { getAttendanceDaily } from '@/lib/data';
import type { RiderAttendance } from '@/lib/data';
import { ECHART_COLORS } from '@/lib/config';

interface Props {
  data: RiderAttendance;
  district: string;
  month: string;
}

export function RiderAttendanceChart({ data, district, month }: Props) {
  const { dates, lines, result } = getAttendanceDaily(data, district, month);

  if (result.length === 0) {
    return <div className="text-center text-muted-foreground py-8">暂无数据</div>;
  }

  const series = lines.map((line, idx) => ({
    name: line,
    type: 'line' as const,
    stack: 'total',
    areaStyle: { opacity: 0.3 },
    smooth: true,
    symbol: 'none',
    lineStyle: { width: 1.5 },
    itemStyle: { color: ECHART_COLORS[idx % ECHART_COLORS.length] },
    data: result.map(r => r.lineData[line] || 0),
  }));

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: any) => {
        let html = `${params[0].name}日<br/>`;
        for (const p of params) {
          html += `${p.marker} ${p.seriesName}: <b>${p.value}</b>人<br/>`;
        }
        return html;
      },
    },
    legend: { data: lines, top: 0, textStyle: { fontSize: 10 }, type: 'scroll' as const },
    grid: { top: 40, right: 20, bottom: 30, left: 40 },
    xAxis: {
      type: 'category' as const,
      data: dates,
      axisLabel: { fontSize: 11 },
      name: '日',
    },
    yAxis: {
      type: 'value' as const,
      name: '出勤人数',
      axisLabel: { fontSize: 11 },
    },
    series,
  };

  return <ReactECharts option={option} style={{ height: 280 }} />;
}