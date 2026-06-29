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

export default function SalesChart({ salesData }) {
  const safeData = Array.isArray(salesData) ? salesData : [];

  return (
    <div className="bg-base-100 p-5 pt-28 rounded-xl shadow dark:text-white/70 dark:bg-black">
      <h2 className="text-xl font-bold mb-10">Daily Sales</h2>

      {safeData.length === 0 ? (
        <p className="text-center text-gray-400">No sales data found</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={safeData}>
            <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}