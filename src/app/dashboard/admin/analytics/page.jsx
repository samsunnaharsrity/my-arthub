"use client";

import { useEffect, useState } from "react";
import { getCategoryAnalytics } from "@/lib/api/analytics";
import CategoryChart from "@/app/components/CategoryChart";

export default function AnalyticsChartPage() {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const data = await getCategoryAnalytics();

        setCategoryData(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.log("CATEGORY ERROR:", error);
        setCategoryData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-6 mt-28">
      {loading ? (
        <div className="h-[300px] flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <CategoryChart categoryData={categoryData} />
      )}
    </div>
  );
}