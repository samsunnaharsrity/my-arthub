import { getUserSession } from "@/lib/core/session";
import { DashboardSidebar } from "../components/dashboardsData/DashboardSidebar";


export default async function Layout({ children }) {
  const user = await getUserSession();

  return (
    <div className="flex">
      <DashboardSidebar user={user} />
      <div className="flex-1">{children}</div>
    </div>
  );
}