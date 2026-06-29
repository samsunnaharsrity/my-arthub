"use client";

import SalesChart from "@/app/components/salesChart";
import { useEffect, useState } from "react";

export default function SalesChartPage() {
  const [salesData, setSalesData] = useState([]);

const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/sales`);
      const json = await res.json();

      setSalesData(Array.isArray(json?.data) ? json.data : []);
    } catch (err) {
      setSalesData([]);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  return (
    <div className="pt-28 dark:text-white/70 dark:bg-black/70">
      <SalesChart salesData={salesData} />
    </div>
  )
}