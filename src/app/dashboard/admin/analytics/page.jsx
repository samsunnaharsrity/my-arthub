"use client";

import {
  Users,
  Palette,
  ShoppingCart,
  DollarSign,
} from "lucide-react";

export default function AnalyticsCards({
  stats,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <Users className="text-primary" />
          <h2>Total Users</h2>
          <p className="text-3xl font-bold">
            {stats.totalUsers}
          </p>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <Palette className="text-secondary" />
          <h2>Total Artists</h2>
          <p className="text-3xl font-bold">
            {stats.totalArtists}
          </p>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <ShoppingCart className="text-success" />
          <h2>Artworks Sold</h2>
          <p className="text-3xl font-bold">
            {stats.totalSold}
          </p>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <DollarSign className="text-warning" />
          <h2>Total Revenue</h2>
          <p className="text-3xl font-bold">
            ${stats.totalRevenue}
          </p>
        </div>
      </div>

    </div>
  );
}