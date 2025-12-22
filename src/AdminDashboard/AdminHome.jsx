import React, { useEffect, useState } from 'react';
import { FaUsers, FaHandHoldingHeart, FaFileAlt, FaClock } from 'react-icons/fa';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        axiosSecure.get('/admin-stats')
            .then(res => setStats(res.data));
    }, [axiosSecure]);

    if (!stats) return <span className="loading loading-spinner loading-lg"></span>;

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-8">Welcome back, Admin!</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Total Users Card */}
                <div className="stats shadow bg-white border-l-4 border-blue-500">
                    <div className="stat">
                        <div className="stat-figure text-blue-500 text-3xl">
                            <FaUsers />
                        </div>
                        <div className="stat-title">Total Users</div>
                        <div className="stat-value text-blue-500">{stats.totalUsers}</div>
                        <div className="stat-desc">Registered Donors</div>
                    </div>
                </div>

                {/* Total Requests Card */}
                <div className="stats shadow bg-white border-l-4 border-purple-500">
                    <div className="stat">
                        <div className="stat-figure text-purple-500 text-3xl">
                            <FaFileAlt />
                        </div>
                        <div className="stat-title">All Requests</div>
                        <div className="stat-value text-purple-500">{stats.totalRequests}</div>
                        <div className="stat-desc">Ever Created</div>
                    </div>
                </div>

                {/* Successful Donations Card */}
                <div className="stats shadow bg-white border-l-4 border-green-500">
                    <div className="stat">
                        <div className="stat-figure text-green-500 text-3xl">
                            <FaHandHoldingHeart />
                        </div>
                        <div className="stat-title">Success</div>
                        <div className="stat-value text-green-500">{stats.successfulDonations}</div>
                        <div className="stat-desc">Lives Impacted</div>
                    </div>
                </div>

                {/* Pending Requests Card */}
                <div className="stats shadow bg-white border-l-4 border-red-500">
                    <div className="stat">
                        <div className="stat-figure text-red-500 text-3xl">
                            <FaClock />
                        </div>
                        <div className="stat-title">Pending</div>
                        <div className="stat-value text-red-500">{stats.pendingRequests}</div>
                        <div className="stat-desc">Urgent Needs</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;