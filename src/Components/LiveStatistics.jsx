import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Users, Target, ShieldCheck } from 'lucide-react';

// Industry Standard: Define static UI data outside the component 
// to ensure purity and performance.
const PARTICLE_DATA = [
    { id: 1, left: '10%', duration: 7, delay: 0.5 },
    { id: 2, left: '25%', duration: 9, delay: 2.1 },
    { id: 3, left: '40%', duration: 6, delay: 1.2 },
    { id: 4, left: '55%', duration: 8, delay: 3.5 },
    { id: 5, left: '70%', duration: 5, delay: 0.8 },
    { id: 6, left: '85%', duration: 10, delay: 4.2 },
    { id: 7, left: '15%', duration: 7.5, delay: 1.5 },
    { id: 8, left: '45%', duration: 6.5, delay: 2.8 },
    { id: 9, left: '65%', duration: 9.5, delay: 0.2 },
    { id: 10, left: '95%', duration: 8.2, delay: 3.1 },
];

const LiveStatistics = () => {
    const [livesSaved, setLivesSaved] = useState(12480);
    const [networkLoad, setNetworkLoad] = useState(64);

    useEffect(() => {
        const interval = setInterval(() => {
            setLivesSaved(prev => prev + Math.floor(Math.random() * 2));
            setNetworkLoad(prev => {
                const next = prev + (Math.random() > 0.5 ? 1 : -1);
                return Math.min(Math.max(next, 60), 85); // Keep between 60-85
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="py-24 container mx-auto px-4 lg:px-20 relative z-10">
            <div className="mb-12 border-l-4 border-secondary pl-6">
                <h2 className="text-sm font-black uppercase tracking-[0.4em] text-secondary mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full animate-ping" /> Global Operations Terminal
                </h2>
                <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                    Real-Time <span className="text-secondary">Impact</span> Metrics
                </h1>
                <p className="mt-4 text-neutral-500 text-xs uppercase tracking-widest max-w-xl font-sans">
                    Monitoring live donor synchronization and emergency response protocols across global network nodes.
                </p>
            </div>
            <section className="py-24 bg-neutral-950 text-white relative overflow-hidden font-mono">

                {/* --- BACKGROUND LAYER: STABLE DATA STREAM --- */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[40px_40px]"></div>

                    {PARTICLE_DATA.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ y: -100, x: p.left, opacity: 0 }}
                            animate={{ y: 1000, opacity: [0, 1, 0] }}
                            transition={{
                                duration: p.duration,
                                repeat: Infinity,
                                ease: "linear",
                                delay: p.delay
                            }}
                            className="absolute w-px h-24 bg-linear-to-b from-transparent via-secondary to-transparent"
                        />
                    ))}
                </div>

                <div className="container mx-auto px-4 lg:px-20 relative z-10">

                    {/* 1. SECTION TITLE */}


                    {/* 2. TOP BAR: SYSTEM STATUS */}
                    <div className="flex flex-wrap justify-between items-center border-b border-white/10 pb-6 mb-12 gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-secondary rounded-full animate-pulse shadow-[0_0_10px_#dc2626]" />
                            <div>
                                <h2 className="text-sm font-black tracking-[0.3em] uppercase">System_Live_Terminal</h2>
                                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Node_ID: LF-GLOBAL-8821</p>
                            </div>
                        </div>
                        <div className="flex gap-8">
                            <div className="text-right">
                                <span className="text-[9px] text-neutral-500 uppercase block">Encryption_Standard</span>
                                <span className="text-xs text-white flex items-center gap-2 justify-end">AES-256 <ShieldCheck size={12} className="text-green-500" /></span>
                            </div>
                            <div className="text-right">
                                <span className="text-[9px] text-neutral-500 uppercase block">Network_Latency</span>
                                <span className="text-xs text-white italic font-bold">14ms [ULTRA_LOW]</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. CENTRAL DATA HUB */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                        {/* LEFT: Gauge Metrics */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="p-6 bg-white/5 border-l-2 border-secondary relative group transition-all hover:bg-white/[0.08]">
                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <Users size={40} />
                                </div>
                                <span className="text-[10px] text-secondary font-black tracking-widest block mb-1 uppercase">Active_Donors</span>
                                <div className="text-3xl font-black italic tracking-tighter text-white">4,821</div>
                                <div className="mt-2 w-full h-1 bg-white/10 overflow-hidden">
                                    <motion.div
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="w-1/2 h-full bg-secondary"
                                    />
                                </div>
                            </div>
                            <div className="p-6 bg-white/5 border-l-2 border-blue-500 relative group transition-all hover:bg-white/8">
                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <Target size={40} />
                                </div>
                                <span className="text-[10px] text-blue-500 font-black tracking-widest block mb-1 uppercase">Regional_Sync</span>
                                <div className="text-3xl font-black italic tracking-tighter text-white">98.2%</div>
                            </div>
                        </div>

                        {/* CENTER: THE "RADAR" PULSE */}
                        <div className="lg:col-span-6 flex flex-col items-center justify-center relative py-12">
                            <div className="absolute w-75 h-75 md:w-112.5 md:h-112.5 border border-white/5 rounded-full flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border-t border-secondary/40 shadow-[0_0_20px_rgba(220,38,38,0.1)]"
                                    style={{ background: 'conic-gradient(from 0deg, transparent 90deg, rgba(220,38,38,0.1) 360deg)' }}
                                />
                                <div className="absolute w-3/4 h-3/4 border border-white/5 rounded-full" />
                                <div className="absolute w-1/2 h-1/2 border border-white/5 rounded-full" />
                            </div>

                            <div className="relative text-center z-10">
                                <Activity className="text-secondary mx-auto mb-4 animate-pulse" size={48} />
                                <span className="text-xs text-neutral-400 uppercase tracking-[0.5em] mb-2 block font-bold">Total_Lives_Impacted</span>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={livesSaved}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-7xl md:text-8xl font-black italic tracking-tighter text-white drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                                    >
                                        {livesSaved.toLocaleString()}
                                    </motion.div>
                                </AnimatePresence>
                                <div className="mt-4 flex items-center justify-center gap-2">
                                    <span className="px-3 py-1 bg-secondary text-white text-[10px] font-black italic uppercase tracking-widest">Live_Impact_Feed</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: System Health */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="p-6 bg-white/5 border-r-2 border-green-500 text-right group transition-all hover:bg-white/8">
                                <span className="text-[10px] text-green-500 font-black tracking-widest block mb-1 uppercase">Response_Speed</span>
                                <div className="text-3xl font-black italic tracking-tighter text-white">180s</div>
                            </div>
                            <div className="p-6 bg-white/5 border-r-2 border-yellow-500 text-right group transition-all hover:bg-white/8">
                                <span className="text-[10px] text-yellow-500 font-black tracking-widest block mb-1 uppercase">Network_Load</span>
                                <div className="text-3xl font-black italic tracking-tighter text-white">{networkLoad}%</div>
                                <div className="mt-2 flex justify-end">
                                    <div className="w-24 h-1 bg-white/10 relative overflow-hidden">
                                        <motion.div
                                            animate={{ width: networkLoad + "%" }}
                                            className="h-full bg-yellow-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LiveStatistics;