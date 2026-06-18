"use client"

import DashboardStats from '@/app/components/dashboardsData/dashboardStats';
import { useSession } from '@/lib/auth-client';
import {
  BriefcaseBusiness,
  Users,
  Building2,
  TrendingUp,
} from "lucide-react";
import React from 'react';

const ArtistHomePage = () => {

const { data: session , isPending } = useSession();

if(isPending) {
    return <div className='py-30'>Loading...</div>
}

const ArtWorkStats = [
  {
    title: "Total Arts",
    value: "1,248",
    icon: <BriefcaseBusiness width={24} height={24} />,
    trend: {
      value: "+12%",
      label: "vs last month",
      type: "up",
    },
  },
  {
    title: "Users (Buyers)",
    value: "8,530",
    icon: <Users width={24} height={24} />,
    trend: {
      value: "+18%",
      label: "growth",
      type: "up",
    },
  },
  {
    title: "Artists",
    value: "520",
    icon: <Building2 width={24} height={24} />,
  },
  {
    title: "Applications",
    value: "14,820",
    icon: <TrendingUp width={24} height={24} />,
    trend: {
      value: "+32%",
      label: "this week",
      type: "up",
    },
  },
];


const user = session?.user;
    return (
        <div className='py-30 '>
            <h1 className='text-4xl font-bold text-green-900'>Artist Dashboard</h1>
            <p className='text-2xl font-bold'>Hello, {user?.name}!</p>
            <DashboardStats stats={ArtWorkStats} />
        </div>
    );
}

export default ArtistHomePage;





