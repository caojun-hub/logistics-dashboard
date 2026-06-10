'use client';

import type { DashboardData } from '@/lib/data';
import { SubPageLayout } from '@/components/SubPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NightSnackTrendChart } from '@/components/charts/NightSnackTrendChart';
import { NightSnackDrillChart } from '@/components/charts/NightSnackDrillChart';

interface Props {
  data: DashboardData;
}

export function NightSnackClientPage({ data }: Props) {
  return (
    <SubPageLayout data={data}>
      {(district, month) => (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle>夜宵妥投率趋势</CardTitle></CardHeader>
              <CardContent>
                <NightSnackTrendChart data={data.nightSnackCum} district={district} month={month} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>夜宵商圈钻取</CardTitle></CardHeader>
              <CardContent>
                <NightSnackDrillChart data={data.nightSnackDrill} district={district} />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </SubPageLayout>
  );
}
