import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-base-100 font-mono flex flex-col relative overflow-hidden text-base-content selection:bg-secondary selection:text-white">
            
            {/* 1. DYNAMIC INDUSTRIAL BACKGROUND (No Images) */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Technical Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]" 
                     style={{ backgroundImage: `linear-gradient(#888 1px, transparent 1px), linear-gradient(90deg, #888 1px, transparent 1px)`, bgSize: '40px 40px' }}>
                </div>

                {/* Animated ECG / Pulse Line (Industry Level SVG) */}
                <svg className="absolute bottom-1/4 left-0 w-full h-32 opacity-20 dark:opacity-30" viewBox="0 0 1000 100">
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        d="M0,50 L200,50 L220,20 L240,80 L260,50 L500,50 L520,10 L540,90 L560,50 L1000,50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-secondary"
                    />
                </svg>

                {/* Subtle Radial Glow */}
                <div className="absolute top-0 right-0 w-125 h-125 bg-secondary/3 rounded-full blur-[120px]"></div>
            </div>

            {/* 2. HIGH-CONTRAST HEADER (Fixed Readability) */}
            <header className="relative z-50 w-full border-b-2 border-base-content/10 bg-base-100/95 backdrop-blur-md shadow-sm">
                <div className="absolute top-0 left-0 w-2 h-full bg-secondary"></div> {/* Industrial Side Accent */}
                
                    <Navbar />
                
            </header>

            {/* 3. TERMINAL INTERFACE AREA */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-20 my-20">
                
                {/* Section Title Ornament */}
                <div className="mb-8 flex flex-col items-center">
                    <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: "100px" }} 
                        className="h-1 bg-secondary mb-2" 
                    />
                    <h2 className="text-[10px] font-black tracking-[0.5em] uppercase opacity-50">
                        System_Access_Protocol
                    </h2>
                </div>

                {/* LOGIN/REGISTER FORM CONTAINER (The "Containment Unit") */}
                <div className="relative w-full max-w-md group">
                    {/* Decorative Brackets for Industrial Vibe */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-secondary opacity-40 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-secondary opacity-40 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="bg-base-200/50 dark:bg-base-300/30 backdrop-blur-lg border border-base-content/10 p-1 shadow-2xl">
                        <div className="border border-base-content/5 p-8 relative overflow-hidden">
                            {/* Scanning Line Effect */}
                            <motion.div 
                                animate={{ top: ["0%", "100%", "0%"] }} 
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 w-full h-px bg-secondary/20 pointer-events-none"
                            />
                            <Outlet />
                        </div>
                    </div>
                </div>

                {/* Bottom System Labels */}
                <div className="mt-12 flex gap-8 text-[8px] font-black uppercase tracking-[0.2em] opacity-30">
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-secondary animate-pulse" /> Data_Stream: Active</span>
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500" /> Link_Status: Secured</span>
                </div>
            </main>

            {/* 4. INDUSTRIAL METADATA FOOTER */}
            <footer className="relative z-30 px-6 py-4 border-t border-base-content/10 bg-base-100">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex gap-6 items-center">
                        <span className="text-[9px] font-black tracking-widest uppercase opacity-40">Build_v2.0.26</span>
                        <div className="h-4 w-px bg-base-content/20"></div>
                        <span className="text-[9px] font-black tracking-widest uppercase text-secondary">LifeFlow_Containment_Unit</span>
                    </div>
                    <div className="text-[9px] font-mono opacity-40">
                        [ 23.96° N, 90.41° E ]
                    </div>
                </div>
            </footer>

            <ToastContainer 
                theme="colored" 
                toastClassName="rounded-none font-mono border-l-4 border-secondary shadow-2xl" 
            />
        </div>
    );
};

export default AuthLayout;