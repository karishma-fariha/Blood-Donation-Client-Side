import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../Components/Sidebar';

const DashboardLayout = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center">
            <Sidebar></Sidebar>

            {/* Right Side: Main Content */}
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;