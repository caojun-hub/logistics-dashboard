import { loadDashboardData } from '@/lib/data';
import { DISTRICTS_21, MONTHS, ZONE_DISTRICTS } from '@/lib/config';
import { DashboardClient } from '@/components/DashboardClient';

export default async function Home() {
  const data = await loadDashboardData();
  return (
    <DashboardClient
      data={data}
      districts={DISTRICTS_21}
      months={MONTHS}
      zoneDistricts={ZONE_DISTRICTS}
    />
  );
}
