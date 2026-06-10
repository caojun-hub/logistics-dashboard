'use client';

import { useState, useMemo } from 'react';
import type { DashboardData } from '@/lib/data';
import { getTarget } from '@/lib/config';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PushTrendChart } from '@/components/charts/PushTrendChart';
import { NonJbpRateChart } from '@/components/charts/NonJbpRateChart';
import { ChengtuoChart } from '@/components/charts/ChengtuoChart';
import { TimeDistChart } from '@/components/charts/TimeDistChart';
import { DistanceDistChart } from '@/components/charts/DistanceDistChart';
import { RiderEfficiencyChart } from '@/components/charts/RiderEfficiencyChart';
import { RiderAttendanceChart } from '@/components/charts/RiderAttendanceChart';
import { PingtanRatioChart } from '@/components/charts/PingtanRatioChart';
import { LineOrderDistChart } from '@/components/charts/LineOrderDistChart';
import { LineAttendanceSummaryChart } from '@/components/charts/LineAttendanceSummaryChart';
import { NavTabs } from '@/components/NavTabs';

interface Props {
  data: DashboardData;
  districts: string[];
  months: string[];
  zoneDistricts: Record<string, string[]>;
}

function formatMonth(m: string) {
  return `${m.slice(0, 4)}年${m.slice(4)}月`;
}

export function DashboardClient({ data, districts, months, zoneDistricts }: Props) {
  const [district, setDistrict] = useState(districts[0]);
  const [month, setMonth] = useState(months[months.length - 1]);

  const kpi = useMemo(() => {
    const target = getTarget(month, district);

    // JBP cumulative: get latest date for the month
    const jbpDates = Object.keys(data.cumJbp.cum[district] || {})
      .filter(d => d.startsWith(month))
      .sort();
    const latestJbp = jbpDates.length > 0 ? data.cumJbp.cum[district][jbpDates[jbpDates.length - 1]] : null;
    const totalPush = latestJbp ? latestJbp[0] : 0;

    // Non-JBP: get latest date for the month
    const nonJbpMonthData = (data.nonJbpCum as Record<string, Record<string, Record<string, [number, number, number, number, number]>>>)[month]?.[district];
    const nonJbpDates = nonJbpMonthData ? Object.keys(nonJbpMonthData).sort() : [];
    const latestNonJbp = nonJbpDates.length > 0 ? nonJbpMonthData[nonJbpDates[nonJbpDates.length - 1]] : null;

    const ttRate = latestNonJbp && latestNonJbp[0] > 0
      ? Math.round(latestNonJbp[1] / latestNonJbp[0] * 10000) / 100
      : 0;
    const zsRate = latestNonJbp && latestNonJbp[0] > 0
      ? Math.round(latestNonJbp[2] / latestNonJbp[0] * 10000) / 100
      : 0;
    const avgT = latestNonJbp && latestNonJbp[4] > 0
      ? Math.round(latestNonJbp[3] / latestNonJbp[4] / 60 * 10) / 10
      : 0;

    return { totalPush, ttRate, zsRate, avgT, target };
  }, [data, district, month]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
          <h1 className="text-lg font-semibold">物流配送运营看板</h1>
          <NavTabs />
          <div className="flex items-center gap-2 ml-auto">
            <Select value={district} onValueChange={v => v && setDistrict(v)}>
              <SelectTrigger size="sm" className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(zoneDistricts).map(([zone, dists]) => (
                  <SelectGroup key={zone}>
                    <SelectLabel>{zone}</SelectLabel>
                    {dists.map(d => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
            <Select value={month} onValueChange={v => v && setMonth(v)}>
              <SelectTrigger size="sm" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map(m => (
                  <SelectItem key={m} value={m}>{formatMonth(m)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">累计推单</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.totalPush.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">妥投率</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{kpi.ttRate}%</span>
                <Badge variant={kpi.ttRate >= kpi.target.tt ? 'default' : 'destructive'}>
                  目标 {kpi.target.tt}%
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">准时率</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{kpi.zsRate}%</span>
                <Badge variant={kpi.zsRate >= kpi.target.zs ? 'default' : 'destructive'}>
                  目标 {kpi.target.zs}%
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">平均配送时长</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.avgT}<span className="text-sm font-normal text-muted-foreground ml-1">分钟</span></div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle>推单趋势</CardTitle></CardHeader>
            <CardContent>
              <PushTrendChart data={data.cumJbp} district={district} month={month} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>妥投率 & 准时率</CardTitle></CardHeader>
            <CardContent>
              <NonJbpRateChart data={data.nonJbpCum} district={district} month={month} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>承托比</CardTitle></CardHeader>
            <CardContent>
              <ChengtuoChart data={data.chengtuoRatio} district={district} month={month} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>时段分布</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <TimeDistChart data={data.timeDist} district={district} month={month} mode="count" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>距离分布</CardTitle></CardHeader>
            <CardContent>
              <DistanceDistChart data={data.distanceDist} district={district} month={month} />
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>骑手效率</CardTitle></CardHeader>
            <CardContent>
              <RiderEfficiencyChart data={data.riderEfficiency} district={district} month={month} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>骑手出勤趋势</CardTitle></CardHeader>
            <CardContent>
              <RiderAttendanceChart data={data.riderAttendance} district={district} month={month} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>平潭占比</CardTitle></CardHeader>
            <CardContent>
              <PingtanRatioChart data={data.pingtanRatio} district={district} month={month} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>线路订单分布</CardTitle></CardHeader>
            <CardContent>
              <LineOrderDistChart data={data.chengtuoRatio} district={district} month={month} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>线路出勤汇总</CardTitle></CardHeader>
            <CardContent>
              <LineAttendanceSummaryChart data={data.riderAttendanceMonthly} district={district} month={month} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
