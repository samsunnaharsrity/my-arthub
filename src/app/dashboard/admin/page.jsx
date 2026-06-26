"use client";

import { useEffect, useState } from "react";
import CategoryChart from "@/app/components/CategoryChart";
import SalesChart from "./salesChart/page";
// import SalesChart from "./salesChart/page";
import {
  Activity,
  Image,
  CreditCard,
  Crown,
  Users,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

export default function AdminDashboard() {
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
    time: sale.createdAt,
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
        // SALES CHART
        const salesRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/sales`
        );
        const sales = await salesRes.json();
        setSalesData(sales);

        // CATEGORY CHART
        const categoryRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/categories`
        );
        const categories = await categoryRes.json();
        setCategoryData(categories);

        // DASHBOARD STATS
        const statsRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/overview`
        );

        const statsData = await statsRes.json();

        setStats(statsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnalytics();
  }, []);


  

  return (
    <div className="space-y-4 mt-28 mb-10 p-10">

      {/* STATS CARDS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-3xl shadow border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Total Users</p>
              <h2 className="text-3xl font-bold">
                {stats.totalUsers}
              </h2>
            </div>

            <Users className="text-blue-600" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Artworks</p>
              <h2 className="text-3xl font-bold">
                {stats.totalArtworks}
              </h2>
            </div>

            <Image className="text-purple-600" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Sales</p>
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

        <div className="bg-white p-6 rounded-3xl shadow border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Revenue</p>
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


      {/* Analytics Cards */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

  {/* SALES CHART */}
  <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-lg border">
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-[#16352E]">
        Sales Analytics
      </h2>
      <p className="text-slate-500">
        Track artwork sales performance over time.
      </p>
    </div>

    <SalesChart salesData={salesData} />
  </div>

  {/* RIGHT SIDEBAR */}
  <div className="space-y-6">

    {/* CATEGORY CARD */}
    <div className="bg-white rounded-3xl p-6 shadow-lg border">
      <h2 className="text-xl font-bold mb-4 text-[#16352E]">
        Artwork Categories
      </h2>

      <CategoryChart categoryData={categoryData} />
    </div>

    {/* QUICK STATS */}
    <div className="bg-gradient-to-br from-[#16352E] to-[#285547] text-white rounded-3xl p-6 shadow-lg">

      <h3 className="text-xl font-bold mb-5">
        Platform Overview
      </h3>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Total Categories</span>
          <span className="font-bold">
            {categoryData.length}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Total Sales Records</span>
          <span className="font-bold">
            {salesData.length}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Active Status</span>
          <span className="badge badge-success">
            Running
          </span>
        </div>
      </div>
    </div>

    {/* RECENT ACTIVITY */}
<div className="bg-white rounded-3xl p-6 shadow-lg border">
  <div className="flex items-center gap-2 mb-5">
    <Activity className="text-[#16352E]" size={22} />
    <h3 className="text-xl font-bold text-[#16352E]">
      Recent Activity
    </h3>
  </div>

  <div className="space-y-5">
    {recentActivities.length === 0 ? (
      <p className="text-slate-500 text-center py-5">
        No recent activities found
      </p>
    ) : (
      recentActivities.map((activity) => {
        const Icon = activity.icon;

        return (
          <div
            key={activity.id}
            className="flex items-start gap-4"
          >
            <div
              className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center text-white`}
            >
              <Icon size={18} />
            </div>

            <div className="flex-1">
              <p className="font-medium text-slate-800">
                {activity.title}
              </p>

              <p className="text-sm text-slate-500">
                {new Date(activity.time).toLocaleString()}
              </p>
            </div>
          </div>
        );
      })
    )}
  </div>
</div>

  </div>
</div>
    </div>
  );
}