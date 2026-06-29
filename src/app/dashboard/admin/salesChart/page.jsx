"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesChartPage({ salesData = [] }) {
  return (
    <div className="bg-base-100 p-5 pt-10 rounded-xl shadow dark:text-white/70 dark:bg-black">
      <h2 className="text-xl font-bold mb-6">Daily Sales</h2>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="totalSales"
              stroke="#8884d8"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}