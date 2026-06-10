'use client';

import ReactECharts from 'echarts-for-react';
import { getTimeDistMonthly } from '@/lib/data';
import type { TimeDist } from '@/lib/data';
import { TIME_SLOT_ORDER, ECHART_COLORS } from '@/lib/config';

interface Props {
  data: TimeDist;
  district: string;
  month: string;
  mode: 'count' | 'ratio';
}

export function TimeDistChart({ data, district, month, mode }: Props) {
  const slotTotals = getTimeDistMonthly(data, district, month);
  const totalAll = Object.values(slotTotals).reduce((a, b) => a + b, 0);

  const sortedSlots = TIME_SLOT_ORDER.filter(s => slotTotals[s]);
  const otherSlots = Object.keys(slotTotals).filter(s => !TIME_SLOT_ORDER.includes(s)).sort();
  const allSlots = [...sortedSlots, ...otherSlots];

  const option = mode === 'count' ? {
    tooltip: { trigger: 'axis' as const },
    grid: { top: 30, right: 20, bottom: 30, left: 60 },
    xAxis: {
      type: 'category' as const,
      data: allSlots,
      axisLabel: { fontSize: 10, rotate: 30 },
    },
    yAxis: {
      type: 'value' as const,
      name: '推单量',
      axisLabel: { fontSize: 11 },
    },
    series: [{
      type: 'bar' as const,
      data: allSlots.map(s => slotTotals[s] || 0),
      itemStyle: {
        color: (params: any) => ECHART_COLORS[params.dataIndex % ECHART_COLORS.length],
      },
      barMaxWidth: 30,
    }],
  } : {
    tooltip: {
      trigger: 'item' as const,
      formatter: (params: any) => `${params.name}<br/>推单: <b>${slotTotals[params.name]}</b> 单<br/>占比: <b>${params.value}%</b>`,
    },
    legend: { type: 'scroll' as const, orient: 'vertical' as const, right: 10, top: 20, bottom: 20, textStyle: { fontSize: 10 } },
    series: [{
      type: 'pie' as const,
      radius: ['40%', '70%'],
      center: ['40%', '50%'],
      data: allSlots.map(s => ({
        name: s,
        value: totalAll > 0 ? Math.round(slotTotals[s] / totalAll * 100 * 100) / 100 : 0,
      })),
      label: { show: false },
      emphasis: { label: { show: true, fontSize: 12, fontWeight: 'bold' } },
    }],
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
}