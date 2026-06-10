'use client';

import ReactECharts from 'echarts-for-react';
import { getCumNonJbpRates } from '@/lib/data';
import type { NonJbpCum } from '@/lib/data';
import { getTarget, ECHART_COLORS } from '@/lib/config';

interface Props {
  data: NonJbpCum;
  district: string;
  month: string;
}

export function NonJbpRateChart({ data, district, month }: Props) {
  const daily = getCumNonJbpRates(data, district, month);
  const target = getTarget(month, district);

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: any) => {
        let html = `${params[0].name}<br/>`;
        for (const p of params) {
          html += `${p.marker} ${p.seriesName}: <b>${p.value?.toFixed(2)}%</b><br/>`;
        }
        return html;
      },
    },
    legend: { data: ['妥投率', '准时率', '妥投目标', '准时目标'], top: 0, textStyle: { fontSize: 11 } },
    grid: { top: 40, right: 20, bottom: 30, left: 50 },
    xAxis: {
      type: 'category' as const,
      data: daily.map(d => d.date.slice(-2)),
      axisLabel: { fontSize: 11 },
      name: '周时点',
    },
    yAxis: {
      type: 'value' as const,
      min: 80,
      max: 100,
      name: '率值(%)',
      axisLabel: { fontSize: 11, formatter: '{value}%' },
    },
    series: [
      {
        name: '妥投率',
        type: 'line' as const,
        data: daily.map(d => d.ttRate),
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { width: 2.5, color: ECHART_COLORS[0] },
        itemStyle: { color: ECHART_COLORS[0] },
      },
      {
        name: '准时率',
        type: 'line' as const,
        data: daily.map(d => d.zsRate),
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { width: 2.5, color: ECHART_COLORS[1] },
        itemStyle: { color: ECHART_COLORS[1] },
      },
      {
        name: '妥投目标',
        type: 'line' as const,
        data: daily.map(() => target.tt),
        lineStyle: { type: 'dashed' as const, color: '#ee6666', width: 1.5 },
        itemStyle: { color: '#ee6666' },
        symbol: 'none',
      },
      {
        name: '准时目标',
        type: 'line' as const,
        data: daily.map(() => target.zs),
        lineStyle: { type: 'dashed' as const, color: '#73c0de', width: 1.5 },
        itemStyle: { color: '#73c0de' },
        symbol: 'none',
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 280 }} />;
}