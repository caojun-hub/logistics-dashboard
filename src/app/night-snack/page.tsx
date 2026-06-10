import { loadDashboardData } from '@/lib/data';
import { NightSnackClientPage } from '@/components/pages/NightSnackClientPage';

export default async function NightSnackPage() {
  const data = await loadDashboardData();
  return <NightSnackClientPage data={data} />;
}