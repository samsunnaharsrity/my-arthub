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

export default function CategoryChart({
  categoryData = [],
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow border">
      <h2 className="text-2xl font-bold mb-5">
        Artworks by Category
      </h2>

      {categoryData.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center">
          No Data Found
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="count"
              nameKey="category"
              outerRadius={110}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}