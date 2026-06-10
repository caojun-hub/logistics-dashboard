'use client';

import ReactECharts from 'echarts-for-react';
import { getDistanceDistMonthly } from '@/lib/data';
import type { DistanceDist } from '@/lib/data';
import { DISTANCE_ORDER, ECHART_COLORS } from '@/lib/config';

interface Props {
  data: DistanceDist;
  district: string;
  month: string;
}

export function DistanceDistChart({ data, district, month }: Props) {
  const segTotals = getDistanceDistMonthly(data, district, month);

  const sortedSegs = DISTANCE_ORDER.filter(s => segTotals[s]);
  const otherSegs = Object.keys(segTotals).filter(s => !DISTANCE_ORDER.includes(s)).sort();
  const allSegs = [...sortedSegs, ...otherSegs];

  const totalAll = Object.values(segTotals).reduce((a, b) => a + b, 0);

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: any) => {
        const p = params[0];
        const pct = totalAll > 0 ? Math.round((segTotals[p.name] || 0) / totalAll * 100 * 10) / 10 : 0;
        return `${p.name}<br/>推单: <b>${p.value}</b> 单<br/>占比: <b>${pct}%</b>`;
      },
    },
    grid: { top: 30, right: 20, bottom: 30, left: 60 },
    xAxis: {
      type: 'category' as const,
      data: allSegs,
      axisLabel: { fontSize: 10, rotate: 30 },
    },
    yAxis: {
      type: 'value' as const,
      name: '推单量',
      axisLabel: { fontSize: 11 },
    },
    series: [{
      type: 'bar' as const,
      data: allSegs.map(s => segTotals[s] || 0),
      itemStyle: {
        color: (params: any) => ECHART_COLORS[params.dataIndex % ECHART_COLORS.length],
      },
      barMaxWidth: 30,
    }],
  };

  return <ReactECharts option={option} style={{ height: 280 }} />;
}