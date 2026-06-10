'use client';

import ReactECharts from 'echarts-for-react';
import { getPingtanMonthly } from '@/lib/data';
import type { PingtanRatio } from '@/lib/data';

interface Props {
  data: PingtanRatio;
  district: string;
  month: string;
}

export function PingtanRatioChart({ data, district, month }: Props) {
  const result = getPingtanMonthly(data, district, month);

  if (!result) {
    return <div className="text-center text-muted-foreground py-8">暂无数据</div>;
  }

  const option = {
    tooltip: {
      trigger: 'item' as const,
      formatter: (params: any) => `${params.name}: ${params.value.toLocaleString()}单 (${params.percent}%)`,
    },
    legend: { bottom: 0, textStyle: { fontSize: 12 } },
    series: [
      {
        type: 'pie' as const,
        radius: ['45%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: true,
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          fontSize: 12,
        },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold' },
        },
        data: [
          { name: '平台单', value: result.pt, itemStyle: { color: '#5470c6' } },
          { name: '非平台单', value: result.nonPt, itemStyle: { color: '#91cc75' } },
        ],
        graphic: [
          {
            type: 'text' as const,
            left: 'center' as const,
            top: '38%' as const,
            style: {
              text: `${result.ratio}%`,
              fontSize: 18,
              fontWeight: 'bold',
              fill: '#333',
            },
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 280 }} />;
}