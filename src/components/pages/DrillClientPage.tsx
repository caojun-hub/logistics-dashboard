'use client';

import type { DashboardData } from '@/lib/data';
import { SubPageLayout } from '@/components/SubPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DrillDataChart } from '@/components/charts/DrillDataChart';
import { NonDrillDataChart } from '@/components/charts/NonDrillDataChart';
import { WeekDrillChart } from '@/components/charts/WeekDrillChart';
import { ImperfAttrChart } from '@/components/charts/ImperfAttrChart';
import { ImperfBizChart } from '@/components/charts/ImperfBizChart';

interface Props {
  data: DashboardData;
}

export function DrillClientPage({ data }: Props) {
  return (
    <SubPageLayout data={data}>
      {(district, month) => (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle>JBP商圈钻取</CardTitle></CardHeader>
              <CardContent>
                <DrillDataChart data={data.drillData} district={district} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>非JBP商圈钻取</CardTitle></CardHeader>
              <CardContent>
                <NonDrillDataChart data={data.nonDrillData} district={district} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>周维度钻取</CardTitle></CardHeader>
              <CardContent>
                <WeekDrillChart data={data.weekDrillData} district={district} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>异常归因分析</CardTitle></CardHeader>
              <CardContent>
                <ImperfAttrChart data={data.imperfAttr} district={district} month={month} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>异常业务线分析</CardTitle></CardHeader>
              <CardContent>
                <ImperfBizChart data={data.imperfBiz} district={district} month={month} />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </SubPageLayout>
  );
}
