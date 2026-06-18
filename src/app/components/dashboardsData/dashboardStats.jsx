"use client";

import DashboardStatCard from "./dashboardStatCard";


export default function DashboardStats({
  stats,
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ">
      {stats.map((item) => (
        <DashboardStatCard
          key={item.title}
          {...item}
        />
      ))}
    </div>
  );
}