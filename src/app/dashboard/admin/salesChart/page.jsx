"use client";

import SalesChart from "@/app/components/salesChart";
import { useEffect, useState } from "react";
// import SalesChart from "@/components/SalesChart";

export default function SalesChartPage() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/sales`
      );
      const data = await res.json();
      setSalesData(data);
    };

    fetchData();
  }, []);

  return <SalesChart salesData={salesData} />;
}