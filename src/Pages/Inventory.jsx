import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, RefreshCw, ShieldAlert, Database } from 'lucide-react';
import useAxiosSecure from '../Hooks/useAxiosSecure'; // Adjust this path to where your hook is saved

const Inventory = () => {
    const axiosSecure = useAxiosSecure(); // Initialize your secure axios instance
    const [bloodStock, setBloodStock] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                setLoading(true);
                // The baseURL is already set in your hook, so we just need the endpoint
                const response = await axiosSecure.get('/blood-stock');
                
                if (Array.isArray(response.data)) {
                    setBloodStock(response.data);
                }
                setError(null);
            } catch (err) {
                console.error("Vault Sync Error:", err);
                setError("CONNECTION_FAILURE: Could not reach the Vercel cloud vault.");
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, [axiosSecure]);

    // Visual logic for the hardware bars
    const getStatusInfo = (units) => {
        const percentage = Math.min((units / 20) * 100, 100); 
        let status = 'STABLE';
        if (units === 0) status = 'CRITICAL';
        else if (units < 5) status = 'LOW';
        return { percentage, status };
    };

    const totalUnits = bloodStock.reduce((acc, curr) => acc + (Number(curr.units) || 0), 0);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center font-mono bg-base-100">
            <RefreshCw className="animate-spin text-secondary mb-4" size={32} /> 
            <span className="uppercase tracking-[0.4em] text-[10px] font-black animate-pulse">Establishing_Secure_Link...</span>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center font-mono bg-base-100 p-4">
            <div className="border-2 border-red-800 p-8 text-center bg-red-800/5">
                <Database className="text-red-800 mx-auto mb-4" size={40} />
                <h2 className="text-red-800 font-black uppercase mb-2">System_Error</h2>
                <p className="text-[10px] opacity-60 uppercase tracking-widest">{error}</p>
                <button onClick={() => window.location.reload()} className="btn btn-sm bg-red-800 border-none text-white mt-6 rounded-none px-10">Reconnect</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-base-100 pt-28 pb-12 px-4 font-mono">
            <div className="container mx-auto">
                {/* Header Section */}
                <header className="mb-12 border-l-4 border-secondary pl-6">
                    <div className="flex items-center gap-3 text-secondary mb-2">
                        <Package size={18} />
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-70">Remote_Asset_Monitor</span>
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter">_Supply_<span className="text-secondary">Vault</span></h1>
                    <div className="flex items-center gap-4 mt-4 text-[10px] text-base-content/50 italic font-bold uppercase tracking-widest">
                        <span>Status: Operational</span>
                        <span className="text-secondary">|</span>
                        <span>Total_Inventory: {totalUnits} Units</span>
                    </div>
                </header>

                {/* Industrial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {bloodStock.map((item, index) => {
                        const { percentage, status } = getStatusInfo(item.units);
                        return (
                            <motion.div 
                                key={item.group} 
                                initial={{ opacity: 0, scale: 0.95 }} 
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative"
                            >
                                <div className="bg-base-300/40 backdrop-blur-xl border border-base-content/10 overflow-hidden relative"
                                     style={{ clipPath: 'polygon(0 0, 92% 0, 100% 12%, 100% 100%, 8% 100%, 0 88%)' }}>
                                    
                                    {/* Top Label */}
                                    <div className={`h-6 flex items-center px-4 ${status === 'CRITICAL' ? 'bg-red-900' : 'bg-secondary'}`}>
                                        <span className="text-[8px] font-black text-white tracking-[0.2em]">UNIT_ID: 00{index + 1}</span>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex justify-between items-end mb-8">
                                            <span className="text-5xl font-black tracking-tighter group-hover:text-secondary transition-all">{item.group}</span>
                                            <div className="text-right">
                                                <p className="text-[9px] opacity-30 font-black uppercase">Vol_Metric</p>
                                                <p className="text-2xl font-black tracking-tighter">{item.units}</p>
                                            </div>
                                        </div>

                                        {/* Segmented Progress Bar */}
                                        <div className="h-4 w-full bg-base-content/5 flex gap-1 p-1 border border-base-content/10">
                                            {[...Array(10)].map((_, i) => (
                                                <div key={i} className={`flex-1 transition-all duration-700 ${i < (percentage / 10) ? (status === 'CRITICAL' ? 'bg-red-800 shadow-[0_0_10px_rgba(153,27,27,0.5)]' : 'bg-secondary shadow-[0_0_10px_rgba(var(--s),0.3)]') : 'bg-base-content/5'}`} />
                                            ))}
                                        </div>

                                        <div className="mt-6 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 ${status === 'CRITICAL' ? 'bg-red-800 animate-pulse' : 'bg-secondary opacity-50'}`} />
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${status === 'CRITICAL' ? 'text-red-800' : 'opacity-40'}`}>{status}_MODE</span>
                                            </div>
                                            {status === 'CRITICAL' && <ShieldAlert size={14} className="text-red-800" />}
                                        </div>
                                    </div>
                                    
                                    {/* Scanning Hover Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent h-[30%] w-full -translate-y-full group-hover:animate-[scan_3s_linear_infinite] pointer-events-none" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(400%); }
                }
            `}</style>
        </div>
    );
};

export default Inventory;