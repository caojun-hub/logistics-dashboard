import { loadDashboardData } from '@/lib/data';
import { RiderQualityClientPage } from '@/components/pages/RiderQualityClientPage';

export default async function RiderQualityPage() {
  const data = await loadDashboardData();
  return <RiderQualityClientPage data={data} />;
}