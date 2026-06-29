"use client";

import { useEffect, useState } from "react";
import CategoryChart from "@/app/components/CategoryChart";
import SalesChart from "./salesChart/page";

import {
  Activity,
  Image,
  CreditCard,
  Users,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtworks: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const recentActivities = [
    ...salesData.slice(-3).map((sale) => ({
      id: sale._id || Math.random(),
      title: "Artwork Purchased",
      time: sale.date || new Date(),
      icon: CreditCard,
      color: "bg-orange-500",
    })),

    ...categoryData.slice(0, 2).map((cat, i) => ({
      id: i,
      title: `${cat.category} Category Active`,
      time: new Date(),
      icon: Image,
      color: "bg-green-500",
    })),
  ];

  useEffect(() => {
const fetchAnalytics = async () => {
  try {
    setLoading(true);

    // Sales
    const salesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/sales`
    );
    const sales = await salesRes.json();

    // Categories
    const categoryRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/categories`
    );
    const categories = await categoryRes.json();

    // Overview
    const statsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/overview`
    );
    const statsData = await statsRes.json();

    console.log("Sales:", sales);
    console.log("Categories:", categories);
    console.log("Stats:", statsData);

    setSalesData(Array.isArray(sales) ? sales : []);
    setCategoryData(
      Array.isArray(categories) ? categories : []
    );

    setStats({
      totalUsers: statsData.totalUsers || 0,
      totalArtworks: statsData.totalArtworks || 0,
      totalSales: statsData.totalSales || 0,
      totalRevenue: statsData.totalRevenue || 0,
    });

  } catch (error) {
    console.log("Dashboard Error:", error);
  } finally {
    setLoading(false);
  }
};

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="mt-28 text-center dark:text-white/70 dark:bg-black/70">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-28 mb-10 p-10 dark:text-white/70 dark:bg-black/70">

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 dark:text-white/70 dark:bg-black/70">

        <div className="bg-white p-6 rounded-3xl shadow border dark:text-white/70 dark:bg-black/70">
          <div className="flex justify-between items-center dark:text-white/70 dark:bg-black/70">
            <div>
              <p className="text-slate-500">
                Total Users
              </p>

              <h2 className="text-3xl font-bold">
                {stats.totalUsers}
              </h2>
            </div>

            <Users
              className="text-blue-600"
              size={40}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow border dark:text-white/70 dark:bg-black/70">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">
                Artworks
              </p>

              <h2 className="text-3xl font-bold">
                {stats.totalArtworks}
              </h2>
            </div>

            <Image
              className="text-purple-600"
              size={40}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow border dark:text-white/70 dark:bg-black/70">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">
                Sales
              </p>

              <h2 className="text-3xl font-bold">
                {stats.totalSales}
              </h2>
            </div>

            <ShoppingCart
              className="text-emerald-600"
              size={40}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow border dark:text-white/70 dark:bg-black/70">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">
                Revenue
              </p>

              <h2 className="text-3xl font-bold">
                ${stats.totalRevenue}
              </h2>
            </div>

            <DollarSign
              className="text-orange-500"
              size={40}
            />
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-lg border dark:text-white/70 dark:bg-black/70">
          <h2 className="text-2xl font-bold mb-5">
            Sales Analytics
          </h2>

          <SalesChart salesData={salesData} />
        </div>

        <div className="space-y-6 dark:text-white/70 dark:bg-black/70">

          <div className="bg-white rounded-3xl p-6 shadow-lg border dark:text-white/70 dark:bg-black/70">
            <h2 className="text-xl font-bold mb-4">
              Artwork Categories
            </h2>

            <CategoryChart
              categoryData={categoryData}
            />
          </div>

          <div className="bg-gradient-to-br from-[#16352E] to-[#285547] text-white rounded-3xl p-6 dark:text-white/70 dark:bg-black/70">
            <h3 className="text-xl font-bold mb-4">
              Platform Overview
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Categories</span>
                <span>
                  {categoryData.length}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Total Sales Records</span>
                <span>{salesData.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>
                <span>Running</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border dark:text-white/70 dark:bg-black/70">
            <div className="flex items-center gap-2 mb-5">
              <Activity size={22} />
              <h3 className="text-xl font-bold">
                Recent Activity
              </h3>
            </div>

            <div className="space-y-4 dark:text-white/70 dark:bg-black/70">
              {recentActivities.map(
                (activity) => {
                  const Icon =
                    activity.icon;

                  return (
                    <div
                      key={activity.id}
                      className="flex gap-3"
                    >
                      <div
                        className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center text-white dark:text-white/70 dark:bg-black/70`}
                      >
                        <Icon size={18} />
                      </div>

                      <div>
                        <p className="font-medium">
                          {activity.title}
                        </p>

                        <p className="text-sm text-gray-500">
                          {new Date(
                            activity.time
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}