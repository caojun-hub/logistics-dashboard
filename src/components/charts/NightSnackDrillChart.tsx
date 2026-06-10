'use client';

import ReactECharts from 'echarts-for-react';
import { getNightSnackDrillSummary } from '@/lib/data';
import type { NightSnackDrill } from '@/lib/data';
import { ECHART_COLORS } from '@/lib/config';

interface Props {
  data: NightSnackDrill;
  district: string;
  weekDate?: string;
}

export function NightSnackDrillChart({ data, district, weekDate }: Props) {
  const result = getNightSnackDrillSummary(data, district, weekDate);

  if (result.length === 0) {
    return <div className="text-center text-muted-foreground py-8">暂无数据</div>;
  }

  const allSlots = new Set<string>();
  for (const r of result) {
    for (const s of r.slots) {
      allSlots.add(s.name);
    }
  }
  const slotList = Array.from(allSlots).sort();

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: any) => {
        let html = `${params[0].name}<br/>`;
        for (const p of params) {
          if (p.value > 0) html += `${p.marker} ${p.seriesName}: <b>${p.value}</b>单<br/>`;
        }
        return html;
      },
    },
    legend: {
      data: slotList,
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
    series: slotList.map((slot, idx) => ({
      name: slot,
      type: 'bar' as const,
      stack: 'total',
      data: result.map(r => {
        const found = r.slots.find(s => s.name === slot);
        return found ? found.orders : 0;
      }),
      itemStyle: { color: ECHART_COLORS[idx % ECHART_COLORS.length] },
      barMaxWidth: 20,
    })),
  };

  return <ReactECharts option={option} style={{ height: 320 }} />;
}
