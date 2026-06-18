"use client";

import { Card } from "@heroui/react";

export default function DashboardStatCard({
  title,
  value,
  icon,
  description,
  trend,
}) {
  return (
    <Card className="border border-default-200/50 bg-content1 p-6 shadow-none hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-default-500 font-medium">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold tracking-tight">
            {value}
          </h3>

          {description && (
            <p className="mt-2 text-sm text-default-500">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          {icon}
        </div>
      </div>

      {trend && (
        <div className="mt-5 flex items-center gap-2">
          <span
            className={`text-sm font-medium ${
              trend.type === "up"
                ? "text-success"
                : "text-danger"
            }`}
          >
            {trend.value}
          </span>

          <span className="text-sm text-default-500">
            {trend.label}
          </span>
        </div>
      )}
    </Card>
  );
}