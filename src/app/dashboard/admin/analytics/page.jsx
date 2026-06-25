"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", sales: 200 },
  { month: "Feb", sales: 450 },
  { month: "Mar", sales: 700 },
  { month: "Apr", sales: 550 },
];

export default function AnalyticsPage() {
  return (
    <section className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Analytics
      </h1>

      <div className="bg-white rounded-3xl p-6 shadow h-[400px]">

        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              dataKey="sales"
              stroke="#16a34a"
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

    </section>
  );
}