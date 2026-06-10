'use client';

import ReactECharts from 'echarts-for-react';
import { getDailyPush } from '@/lib/data';
import type { CumJbp } from '@/lib/data';
import { ECHART_COLORS } from '@/lib/config';

interface Props {
  data: CumJbp;
  district: string;
  month: string;
}

export function PushTrendChart({ data, district, month }: Props) {
  const daily = getDailyPush(data, district, month);

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: any) => {
        const p = params[0];
        return `${p.name}<br/>推单量: <b>${p.value}</b> 单`;
      },
    },
    grid: { top: 30, right: 20, bottom: 30, left: 50 },
    xAxis: {
      type: 'category' as const,
      data: daily.map(d => d.date.slice(-2)),
      axisLabel: { fontSize: 11 },
      name: '日',
    },
    yAxis: {
      type: 'value' as const,
      name: '推单量',
      axisLabel: { fontSize: 11 },
    },
    series: [{
      type: 'line' as const,
      data: daily.map(d => d.push),
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { width: 2.5, color: ECHART_COLORS[0] },
      itemStyle: { color: ECHART_COLORS[0] },
      areaStyle: {
        color: {
          type: 'linear' as const,
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(84,112,198,0.3)' },
            { offset: 1, color: 'rgba(84,112,198,0.02)' },
          ],
        },
      },
    }],
  };

  return <ReactECharts option={option} style={{ height: 280 }} />;
}