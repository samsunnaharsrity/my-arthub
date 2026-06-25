"use client";

import { useEffect, useState } from "react";
import { getCategoryAnalytics } from "@/lib/api/analytics";
import CategoryChart from "@/app/components/CategoryChart";

export default function AdminDashboard() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getCategoryAnalytics();
        setCategoryData(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-6 mt-28">
      <CategoryChart categoryData={categoryData} />
    </div>
  );
}