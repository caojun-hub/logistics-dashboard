'use client';

import type { DashboardData } from '@/lib/data';
import { SubPageLayout } from '@/components/SubPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RiderQualityChart } from '@/components/charts/RiderQualityChart';
import { RiderMonthDrillChart } from '@/components/charts/RiderMonthDrillChart';
import { RiderWeekChart } from '@/components/charts/RiderWeekChart';

interface Props {
  data: DashboardData;
}

export function RiderQualityClientPage({ data }: Props) {
  return (
    <SubPageLayout data={data}>
      {(district, month) => (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle>骑手质量趋势</CardTitle></CardHeader>
              <CardContent>
                <RiderQualityChart data={data.riderQualityCum} district={district} month={month} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>骑手月度钻取</CardTitle></CardHeader>
              <CardContent>
                <RiderMonthDrillChart data={data.riderMonthDrill} district={district} month={month} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>骑手周数据</CardTitle></CardHeader>
              <CardContent>
                <RiderWeekChart data={data.riderWeekData} district={district} />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </SubPageLayout>
  );
}
