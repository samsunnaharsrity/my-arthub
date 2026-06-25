"use client";

import { useEffect, useState } from "react";
import CategoryChart from "@/app/components/CategoryChart";
import SalesChart from "./salesChart/page";
// import SalesChart from "./salesChart/page";

export default function AdminDashboard() {
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Sales Data
        const salesRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/sales`
        );
        const sales = await salesRes.json();
        setSalesData(sales);

        // Category Data
        const categoryRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/categories`
        );
        const categories = await categoryRes.json();
        setCategoryData(categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-8">
      {/* Analytics Cards */}

      <div className="grid md:grid-cols-2 gap-6">
        <SalesChart salesData={salesData} />

        <CategoryChart categoryData={categoryData} />
      </div>
    </div>
  );
}