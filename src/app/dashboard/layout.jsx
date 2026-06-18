import React from 'react';
import { DashboardSidebar } from '../components/dashboardsData/DashboardSidebar';

const DashboardLayout = ({children}) => {
    return (
        <div className='flex min-h-screen'>
            <DashboardSidebar></DashboardSidebar>
            <div>{children}</div>
        </div>
    );
}

export default DashboardLayout;
