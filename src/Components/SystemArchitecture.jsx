import React from 'react';
import { motion } from 'framer-motion';
import { Radio, ShieldCheck, MapPin, HeartPulse, Activity, Zap, Timer, Globe } from 'lucide-react';

const SystemArchitecture = () => {
    const steps = [
        {
            id: "01",
            protocol: "POST_REQUEST",
            title: "Create a Request",
            desc: "Submit a blood request with location and type. The system broadcasts the signal instantly.",
            icon: <Radio className="w-6 h-6" />,
        },
        {
            id: "02",
            protocol: "ALGO_MATCH",
            title: "Match Donors",
            desc: "Our system identifies eligible donors nearby and sends them an immediate mobile alert.",
            icon: <ShieldCheck className="w-6 h-6" />,
        },
        {
            id: "03",
            protocol: "DIRECT_LINK",
            title: "Direct Contact",
            desc: "Once a donor accepts, you are connected to coordinate the life-saving donation.",
            icon: <MapPin className="w-6 h-6" />,
        },
        {
            id: "04",
            protocol: "LOG_IMPACT",
            title: "Track Impact",
            desc: "When the donation is done, the system updates records to show another life saved.",
            icon: <HeartPulse className="w-6 h-6" />,
        }
    ];

    return (
        <section className="py-24 bg-base-100 relative overflow-hidden">
            
            {/* --- ADVANCED BACKGROUND START --- */}
            {/* 1. Deep Blueprint Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[50px_50px]"></div>
            
            {/* 2. Moving "Circuit Traces" (Subtle Data Lines) */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none">
                <motion.path
                    d="M-100 100 L200 100 L300 300 L1000 300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                    d="M1200 800 L800 800 L700 600 L0 600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2 }}
                />
            </svg>

            {/* 3. Radial Vignette (Focuses light on the center) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)]"></div>
            {/* --- ADVANCED BACKGROUND END --- */}

            <div className="container mx-auto px-4 lg:px-20 relative z-10">
                
                {/* Header */}
                <div className="max-w-3xl mb-20">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-0.5 bg-secondary"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary animate-pulse">Operational Protocol</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-base-content uppercase italic">
                        The <span className="text-secondary">Network</span> Architecture
                    </h2>
                </div>

                {/* Architecture Schematic */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative mb-24">
                    
                    {/* Horizontal Connector Line (Desktop Only) */}
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-base-content/10 z-0">
                        <motion.div 
                            animate={{ x: ['-10%', '110%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="w-40 h-px bg-linear-to-r from-transparent via-secondary to-transparent shadow-[0_0_10px_#dc2626]"
                        />
                    </div>

                    {steps.map((step, index) => (
                        <motion.div 
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="relative group flex flex-col items-center lg:items-start text-center lg:text-left"
                        >
                            {/* Icon Node with ZOOM EFFECT */}
                            <motion.div 
                                whileHover={{ scale: 1.1 }}
                                className="w-24 h-24 bg-base-100 border-2 border-base-content/10 flex items-center justify-center mb-8 group-hover:border-secondary group-hover:shadow-[0_0_40px_rgba(220,38,38,0.15)] transition-all duration-500 rounded-sm relative z-10 cursor-help"
                            >
                                {/* Zoomed Icon Core */}
                                <motion.div 
                                    whileHover={{ scale: 1.4, rotate: [0, -10, 10, 0] }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="text-base-content group-hover:text-secondary transition-colors"
                                >
                                    {step.icon}
                                </motion.div>

                                {/* Small Internal Corners */}
                                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-base-content/20 group-hover:border-secondary transition-colors" />
                                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-base-content/20 group-hover:border-secondary transition-colors" />
                                
                                <div className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-black px-2 py-0.5">
                                    {step.id}
                                </div>
                            </motion.div>

                            {/* Text Content */}
                            <div className="space-y-2 relative">
                                <span className="text-[9px] font-mono font-bold text-secondary uppercase tracking-[0.3em]">
                                    {step.protocol}
                                </span>
                                <h3 className="text-xl font-black text-base-content uppercase group-hover:text-secondary transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-accent leading-relaxed max-w-60 lg:max-w-none">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Mobile Connector */}
                            {index !== steps.length - 1 && (
                                <div className="flex lg:hidden justify-center py-8">
                                    <div className="w-px h-12 bg-linear-to-b from-secondary to-transparent opacity-30"></div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Professional Telemetry Bar (Efficiency & Response) */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-neutral-950 text-white rounded-sm overflow-hidden border border-white/5 shadow-2xl"
                >
                    <div className="flex flex-col lg:flex-row items-stretch divide-y lg:divide-y-0 lg:divide-x divide-white/10">
                        
                        <div className="px-6 py-5 flex items-center gap-3 bg-secondary/5">
                            <Activity size={16} className="text-secondary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Status_Control</span>
                        </div>

                        {[
                            { label: "Network Integrity", val: "99.9%", status: "Verified", icon: <Zap size={12} /> },
                            { label: "Avg Response", val: "< 180s", status: "Live_Avg", icon: <Timer size={12} /> },
                            { label: "Global Coverage", val: "24/7", status: "Active Nodes", icon: <Globe size={12} /> }
                        ].map((m, i) => (
                            <div key={i} className="flex-1 px-8 py-5 hover:bg-white/2 transition-colors group cursor-default">
                                <div className="flex items-center gap-2 mb-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                    {m.icon}
                                    <span className="text-[9px] font-bold uppercase tracking-widest">{m.label}</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-mono font-black italic">{m.val}</span>
                                    <span className="text-[9px] text-neutral-500 group-hover:text-secondary font-black uppercase transition-colors">
                                        {m.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SystemArchitecture;