"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28CFF",
  "#FF6B6B",
];

export default function CategoryChart({ categoryData = [] }) {
  const safeData = Array.isArray(categoryData) ? categoryData : [];

  return (
    <div className="bg-white p-6 rounded-2xl shadow border">
      <h2 className="text-2xl font-bold mb-5">
        Artworks by Category
      </h2>

      {safeData.length === 0 ? (
        <div className="h-[350px] flex items-center justify-center text-gray-500">
          No Data Found
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={safeData}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={120}
              labelLine={false}
              label={({ category, percent }) =>
                `${category} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {safeData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.category}-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name, props) => [
                `${value} artworks`,
                props.payload.category,
              ]}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}