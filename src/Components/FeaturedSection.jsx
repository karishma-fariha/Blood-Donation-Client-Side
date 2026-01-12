import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaUsers, FaMedkit } from 'react-icons/fa';
import { Activity, ShieldCheck, Zap, Plus, Target } from 'lucide-react';
import { Link } from 'react-router';

const FeaturedSection = () => {
    const features = [
        {
            id: "MOD-001",
            icon: <FaHeartbeat />,
            title: "Emergency Impact",
            label: "LIFE_SAVING_PROTOCOL",
            description: "One single donation can save up to three lives. Your blood helps patients undergoing surgery, cancer treatment, and chronic illnesses."
        },
        {
            id: "MOD-002",
            icon: <FaMedkit />,
            title: "Biometric Wellness",
            label: "HEALTH_OPTIMIZATION",
            description: "Donating blood improves cardiovascular health and reduces iron stores. It acts as a vital check-up for pulse, BP, and hemoglobin."
        },
        {
            id: "MOD-003",
            icon: <FaUsers />,
            title: "Network Integration",
            label: "COMMUNITY_NODE",
            description: "Become part of a massive network of heroes. Connect with people in your area and answer emergency requests in real-time."
        }
    ];

    return (
        <section className="py-24 bg-base-100 relative overflow-hidden">
            
            {/* --- BACKGROUND EFFECTS --- */}
            {/* 1. Moving Engineering Grid */}
            <motion.div 
                animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"
            />
            
            {/* 2. Radial Pulse (Center Glow) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.03)_0%,transparent_70%)] animate-pulse" />

            <div className="container mx-auto px-4 lg:px-20 relative z-10">
                
                {/* Section Heading */}
                <div className="mb-20">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 mb-4"
                    >
                        <Activity size={14} className="text-secondary animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Advantage_Specifications</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-base-content uppercase italic leading-none">
                        Why Join the <span className="text-secondary">Network?</span>
                    </h2>
                </div>

                {/* Feature Grid with Hover Movement */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div 
                            key={feature.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -12 }} // Card movement on hover
                            className="relative group cursor-pointer"
                        >
                            {/* The "Card" Structure */}
                            <div className="p-10 h-full bg-base-200/40 backdrop-blur-sm border border-base-content/10 rounded-sm relative overflow-hidden transition-all duration-500 group-hover:border-secondary/50 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                                
                                {/* Background "Scanner" Effect on Hover */}
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                                    initial={false}
                                />
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                                <div className="mb-10 flex justify-between items-start relative z-10">
                                    {/* Logo with ZOOM effect */}
                                    <motion.div 
                                        whileHover={{ scale: 1.3, rotate: [0, -5, 5, 0] }}
                                        className="text-5xl text-base-content group-hover:text-secondary transition-colors duration-300 drop-shadow-[0_0_10px_rgba(220,38,38,0)] group-hover:drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                                    >
                                        {feature.icon}
                                    </motion.div>
                                    
                                    <span className="text-[10px] font-mono font-bold text-accent italic opacity-40 group-hover:opacity-100 transition-opacity">
                                        {feature.id}
                                    </span>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-secondary animate-ping rounded-full" />
                                        <span className="text-[9px] font-mono font-black text-secondary uppercase tracking-[0.2em]">
                                            {feature.label}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-2xl font-black text-base-content uppercase tracking-tight group-hover:translate-x-1 transition-transform">
                                        {feature.title}
                                    </h3>
                                    
                                    <p className="text-sm text-accent leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Corner Brackets (Visible on Hover) */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity">
                                    <Target size={40} className="text-secondary" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Registration Terminal (Keeping your button exactly the same) */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mt-16 bg-neutral-900 border border-white/5 p-8 md:p-12 relative overflow-hidden group shadow-2xl"
                >
                    {/* Dark Background Movement Effect */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                                Ready to Initialize <span className="text-secondary">Protocol?</span>
                            </h3>
                            <p className="text-neutral-400 font-mono text-sm uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                System Status: <span className="text-green-500">Awaiting_New_Donor</span>
                            </p>
                        </div>
                        
                        {/* GET STARTED BUTTON (Unchanged as requested, but added a hover wrapper) */}
                        <Link to='/login' className="group rounded-lg relative px-10 py-4 bg-secondary overflow-hidden transition-all hover:pr-14">
                            <span className="relative z-10 text-white font-black uppercase tracking-widest text-sm flex items-center gap-2">
                                <Plus size={18} /> Get Started
                            </span>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                                <Zap size={16} className="text-white fill-white" />
                            </div>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedSection;