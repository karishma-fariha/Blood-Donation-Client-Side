import React, { useEffect, useState } from 'react';
import { 
    Users, Activity, DollarSign, CheckCircle, 
    Clock, Shield, LayoutGrid, Zap, PieChart as PieChartIcon, 
    ChevronRight, RefreshCcw
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import useAxiosSecure from '../Hooks/useAxiosSecure';

// ✅ REUSABLE STAT CARD WITH FIXED ALIGNMENT
const StatCard = ({ title, value, desc, icon: Icon, colorClass }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className="relative group overflow-hidden border-2 border-base-content/10 bg-base-200/30 p-6 shadow-xl flex flex-col h-full"
    >
        {/* Background Accent Line */}
        <div className={`absolute top-0 left-0 h-1 w-full ${colorClass} opacity-50 group-hover:opacity-100 transition-opacity`} />
        
        {/* Top Section */}
        <div className="flex justify-between items-start gap-2 mb-auto">
            <div className="space-y-2 flex-1">
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] opacity-40 leading-none">
                    {title}
                </p>
                <h3 className="text-3xl lg:text-4xl xl:text-5xl font-black italic tracking-tighter uppercase leading-none truncate">
                    {value}
                </h3>
            </div>
            
            <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className={`shrink-0 p-3 border-2 border-base-content/5 ${colorClass.replace('bg-', 'text-')} opacity-80 bg-base-100/50 shadow-inner`}
            >
                <Icon size={24} />
            </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-base-content/10">
            <div className={`shrink-0 w-2 h-2 rounded-full animate-pulse ${colorClass}`} />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60 truncate">
                {desc}
            </span>
        </div>
        
        {/* Background Icon Watermark */}
        <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
            <Icon size={100} />
        </div>
    </motion.div>
);

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        axiosSecure.get('/admin-stats')
            .then(res => setStats(res.data))
            .catch(err => console.error("STAT_LOAD_FAILURE", err));
    }, [axiosSecure]);

    if (!stats) return (
        <div className="h-screen flex items-center justify-center font-mono bg-base-100">
            <div className="flex flex-col items-center gap-4">
                <RefreshCcw size={40} className="text-secondary animate-spin" />
                <span className="text-xl tracking-[0.5em] uppercase opacity-50">Syncing_Nodes...</span>
            </div>
        </div>
    );

    // ✅ PIE CHART DATA LOGIC
    const otherReqs = (stats.totalRequests || 0) - (stats.successfulDonations || 0) - (stats.pendingRequests || 0);
    const chartData = [
        { name: 'Successful_Ops', value: stats.successfulDonations || 0, color: '#ef4444' }, // Secondary/Red
        { name: 'Pending_Alerts', value: stats.pendingRequests || 0, color: '#f59e0b' },   // Amber
        { name: 'Others', value: otherReqs > 0 ? otherReqs : 0, color: '#3b82f6' },        // Blue
    ].filter(d => d.value > 0);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black border-2 border-base-content/20 p-4 font-mono shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">Mission_Data</p>
                    <p className="text-sm font-black" style={{ color: payload[0].payload.color }}>
                        {payload[0].name}: {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-base-100 p-4 md:p-8 lg:p-12 font-mono text-base-content selection:bg-secondary selection:text-white">
            
            {/* 1. HEADER AREA */}
            <header className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b-2 border-base-content/5 pb-10">
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-secondary">
                        <Shield size={20} className="animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.5em]">Security_Clearance: Alpha_Admin</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                        Command_Central
                    </h1>
                </div>
                <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase opacity-40">
                    <div className="border-2 border-base-content/10 px-4 py-2 flex items-center gap-2 bg-base-200/50">
                        <LayoutGrid size={14} /> Uplink: Stable
                    </div>
                    <div className="border-2 border-base-content/10 px-4 py-2 flex items-center gap-2 bg-base-200/50">
                        <Zap size={14} /> Latency: 18ms
                    </div>
                </div>
            </header>

            {/* 2. TOP STATS ROW - FIXED ALIGNMENT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12 items-stretch">
                <StatCard title="Total_Donors" value={stats.totalUsers || 0} desc="Registered_Assets" icon={Users} colorClass="bg-blue-500" />
                <StatCard title="Mission_Logs" value={stats.totalRequests || 0} desc="Total_Entries" icon={Activity} colorClass="bg-purple-500" />
                <StatCard title="Treasury" value={`$${stats.totalRevenue || 0}`} desc="Operational_Funds" icon={DollarSign} colorClass="bg-emerald-500" />
                <StatCard title="Lives_Saved" value={stats.successfulDonations || 0} desc="Completed_Ops" icon={CheckCircle} colorClass="bg-secondary" />
                <StatCard title="Urgent_Needs" value={stats.pendingRequests || 0} desc="Pending_Deployment" icon={Clock} colorClass="bg-amber-500" />
            </div>

            {/* 3. ANALYTICS & CONTROLS ROW */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* DONUT CHART COMPONENT */}
                <div className="xl:col-span-2 border-2 border-base-content/10 bg-base-200/20 p-8 relative overflow-hidden h-[500px] flex flex-col shadow-2xl">
                    <div className="flex justify-between items-center mb-10 z-10">
                        <div className="flex items-center gap-3">
                            <PieChartIcon className="text-secondary" size={20} />
                            <h4 className="text-sm font-black uppercase tracking-[0.4em]">Protocol_Distribution_Analytics</h4>
                        </div>
                        <div className="hidden md:block text-[10px] font-black opacity-30 tracking-[0.2em] uppercase">
                            Visualizing: {stats.totalRequests} Entries
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    innerRadius={90}
                                    outerRadius={150}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend 
                                    verticalAlign="bottom" 
                                    formatter={(value) => <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 opacity-70">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Industrial Background Pattern */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-50"></div>
                </div>

                {/* TACTICAL QUICK ACTIONS */}
                <div className="border-2 border-base-content/10 bg-secondary/5 p-8 flex flex-col justify-between shadow-2xl relative">
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-sm font-black uppercase tracking-[0.4em] mb-2">Priority_Actions</h4>
                            <p className="text-[10px] font-bold opacity-40 uppercase">Direct_System_Manipulation</p>
                        </div>
                        
                        <div className="space-y-4">
                            {[
                                { label: "Generate_Global_Report", icon: Activity },
                                { label: "Audit_Security_Logs", icon: Shield },
                                { label: "Refresh_Master_Database", icon: RefreshCcw }
                            ].map((btn, idx) => (
                                <motion.button 
                                    key={idx}
                                    whileHover={{ x: 10, backgroundColor: 'rgba(239, 68, 68, 1)', color: 'white' }}
                                    className="w-full py-4 px-6 border-2 border-base-content/10 flex items-center justify-between text-xs font-black uppercase tracking-widest group transition-colors"
                                >
                                    <span>{btn.label}</span>
                                    <ChevronRight size={16} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-base-content/5">
                        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest opacity-30 mb-2">
                            <span>System_Integrity</span>
                            <span>98.4%</span>
                        </div>
                        <div className="w-full h-1 bg-base-content/5">
                            <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: '98.4%' }} 
                                className="h-full bg-secondary" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* SYSTEM FOOTER */}
            <footer className="mt-12 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] opacity-20">
                <span>Core_Version: 4.2.0_Stable</span>
                <span className="animate-pulse">Monitoring_System_Active...</span>
            </footer>
        </div>
    );
};

export default AdminHome;