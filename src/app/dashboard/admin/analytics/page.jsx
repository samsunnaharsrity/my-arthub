"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics`,
          {
            cache: "no-store",
          }
        );

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

    loadAnalytics();
  }, []);

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Analytics
      </h1>

      <div className="bg-white rounded-3xl p-6 shadow h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#16a34a"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}