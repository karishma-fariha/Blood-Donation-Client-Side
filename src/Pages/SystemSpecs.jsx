import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, Heart, CheckCircle, Terminal, 
    Zap, Droplets, ShieldCheck, Trophy, PieChart as PieIcon 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const SystemSpecs = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({
        totalMissions: 0,
        activeMissions: 0,
        totalUsers: 0,
        bloodDist: [],
        topDonors: []
    });
    const [loading, setLoading] = useState(true);

    // Tactical Color Palette for Blood Groups
    const COLORS = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#71717A'];

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axiosSecure.get('/system-statistics');
                setStats(res.data);
                setLoading(false);
            } catch (err) {
                console.error("STATS_SYNC_ERROR",err);
            }
        };
        fetchStats();
        const interval = setInterval(fetchStats, 15000); // Sync every 15s
        return () => clearInterval(interval);
    }, [axiosSecure]);

    return (
        <div className="min-h-screen bg-base-100 pt-28 pb-12 px-4 font-mono selection:bg-secondary">
            <div className="container mx-auto">
                
                {/* Tactical Header */}
                <header className="mb-12 border-b border-base-content/10 pb-8 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-2 text-secondary mb-2">
                            <Droplets size={16} className="fill-secondary animate-pulse" />
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase">Network_Impact_Monitor</span>
                        </div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter italic">
                            _Impact_<span className="text-secondary underline decoration-4 underline-offset-8">Stats</span>
                        </h1>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-[10px] font-black opacity-30 uppercase">Node_Status</p>
                        <p className="text-xs font-bold text-green-500 tracking-widest">[ {loading ? 'SYNCING...' : 'LIVE_FEED'} ]</p>
                    </div>
                </header>

                {/* Primary Metric Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { icon: Users, label: "Total_Donors", val: stats.totalUsers, sub: "HEROES_JOINED", col: "bg-secondary" },
                        { icon: Heart, label: "Urgent_Needs", val: stats.activeMissions, sub: "PENDING_HELP", col: "bg-blue-500" },
                        { icon: CheckCircle, label: "Lives_Saved", val: stats.totalMissions, sub: "MISSIONS_DONE", col: "bg-green-500" },
                        { icon: ShieldCheck, label: "Reliability", val: "99.9%", sub: "SYSTEM_UPTIME", col: "bg-yellow-500" },
                    ].map((card, i) => (
                        <div key={i} className="bg-base-200/50 border border-base-content/10 p-6 relative overflow-hidden group">
                            <div className={`absolute top-0 left-0 w-1 h-full ${card.col}`} />
                            <card.icon size={20} className="opacity-30 mb-4 group-hover:text-secondary transition-colors" />
                            <p className="text-[10px] font-black opacity-40 uppercase mb-1 tracking-widest">{card.label}</p>
                            <p className="text-3xl font-black italic">{card.val}</p>
                            <p className="text-[9px] font-bold opacity-20 mt-2">{card.sub}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Donut Chart: Blood Distribution */}
                    <div className="lg:col-span-2 bg-base-200/30 border border-base-content/10 p-8 h-[450px] flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <PieIcon className="text-secondary" size={20} />
                            <h2 className="text-sm font-black uppercase tracking-widest">Donor_Blood_Groups</h2>
                        </div>
                        <div className="flex-1 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats.bloodDist}
                                        innerRadius={80}
                                        outerRadius={120}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {stats.bloodDist.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '0px', color: '#fff', fontFamily: 'monospace' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Legend iconType="rect" formatter={(value) => <span className="text-[10px] font-black uppercase opacity-60 ml-2">{value}</span>} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top Hero Leaderboard */}
                    <div className="bg-base-200/30 border border-base-content/10 p-8 h-[450px] flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <Trophy className="text-secondary" size={20} />
                            <h2 className="text-sm font-black uppercase tracking-widest">Top_Helpers</h2>
                        </div>
                        <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                            <AnimatePresence>
                                {stats.topDonors?.map((donor, index) => (
                                    <motion.div 
                                        key={donor._id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center justify-between p-4 bg-base-300/40 border-l-4 border-secondary/30 hover:border-secondary transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-black opacity-20">#{index + 1}</span>
                                            <div>
                                                <p className="text-xs font-black uppercase group-hover:text-secondary">{donor.name}</p>
                                                <p className="text-[9px] font-bold opacity-40">{donor.bloodGroup} // {donor.district}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black italic">{donor.donationCount || 0}</p>
                                            <p className="text-[8px] font-black opacity-20 uppercase">Donated</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>

                {/* Industrial Status Bar */}
                <div className="mt-8 bg-black text-green-500/50 p-4 border-t-2 border-secondary flex items-center justify-between text-[10px] font-bold uppercase">
                    <div className="flex items-center gap-4">
                        <Terminal size={14} className="text-green-500" />
                        <span>Link_Encrypted: AES_256</span>
                        <span className="opacity-20">|</span>
                        <span>Protocol: BLOOD_NET_V2</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span>System_Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemSpecs;