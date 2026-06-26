"use client";

import React, { useEffect, useState } from "react";
import DashboardStats from "@/app/components/dashboardsData/dashboardStats";
import { useSession } from "@/lib/auth-client";

import {
  BriefcaseBusiness,
  Users,
  Building2,
  TrendingUp,
} from "lucide-react";

const ArtistHomePage = () => {
  const { data: session, isPending } = useSession();

  const [stats, setStats] = useState({
    totalArtworks: 0,
    totalUsers: 0,
    totalArtists: 0,
    totalPurchases: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/home-dashboard`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (isPending || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-semibold animate-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return <div>Please login first.</div>;
  }

  const user = session.user;

  const ArtWorkStats = [
    {
      title: "Total Artworks",
      value: stats.totalArtworks,
      icon: <BriefcaseBusiness size={24} />,
      description: "All uploaded artworks",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={24} />,
      description: "Registered buyers",
    },
    {
      title: "Total Artists",
      value: stats.totalArtists,
      icon: <Building2 size={24} />,
      description: "Active artists",
    },
    {
      title: "Total Purchases",
      value: stats.totalPurchases,
      icon: <TrendingUp size={24} />,
      description: "Completed purchases",
    },
  ];

  return (
    <section className="space-y-10 p-6 my-30 md:p-8">
      {/* Hero Section */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-widest text-white/80">
          Artist Dashboard
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Welcome back, {user.name} 👋
        </h1>

        <p className="mt-3 max-w-2xl text-white/80">
          Monitor your platform activity, track artworks, artists,
          users, and purchases from one place.
        </p>
      </div>

      {/* Stats */}
      <div>
        <div className="">
          <h2 className="text-2xl font-bold text-default-900">
            Overview
          </h2>

          <p className="text-default-500">
            Quick summary of your platform performance.
          </p>
        </div>

        <DashboardStats stats={ArtWorkStats} />
      </div>
    </section>
  );
};

export default ArtistHomePage;