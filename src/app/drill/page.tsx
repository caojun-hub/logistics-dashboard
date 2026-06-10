import { loadDashboardData } from '@/lib/data';
import { DrillClientPage } from '@/components/pages/DrillClientPage';

export default async function DrillPage() {
  const data = await loadDashboardData();
  return <DrillClientPage data={data} />;
}