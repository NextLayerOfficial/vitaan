// app/dashboard/page.tsx  (Server Component)
import { getLatestMagazineFiles } from "@/app/actions/firstThree";
import DashboardClient from "@/components/dashboardclient";

export default async function DashboardPage() {
  const latestMagazines = await getLatestMagazineFiles();
  return <DashboardClient latestMagazines={latestMagazines} />;
  
}
