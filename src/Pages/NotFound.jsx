import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { AlertTriangle, Terminal, RefreshCw, Home } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center font-mono relative overflow-hidden">
            {/* Background Scanlines Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
            
            {/* Dual Ambient Glow: Primary and Secondary */}
            <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[140px] animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2 w-125 h-125 bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-2xl mx-auto border border-white/10 bg-black/40 backdrop-blur-xl p-8 md:p-12 shadow-2xl relative">
                    
                    {/* Top Status Bar: Primary for structural integrity */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                    
                    <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-2">
                            {/* Alert icon stays Secondary (Red) for danger */}
                            <AlertTriangle size={18} className="text-secondary animate-bounce" />
                            <span className="text-[10px] font-black text-secondary tracking-[0.3em] uppercase">Status: Fatal_Error</span>
                        </div>
                        <span className="text-[10px] text-primary font-bold uppercase tracking-widest underline opacity-70">ID: 0x404_NOT_FOUND</span>
                    </div>

                    {/* Glitch 404 Heading */}
                    <div className="relative mb-10">
                        <motion.h1 
                            initial={{ skewX: 0 }}
                            animate={{ skewX: [0, -10, 10, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 3 }}
                            className="text-8xl md:text-9xl font-black text-white italic tracking-tighter opacity-90"
                        >
                            404
                        </motion.h1>
                        {/* Shadow glitch using Secondary color */}
                        <div className="absolute top-0 left-0 text-8xl md:text-9xl font-black text-secondary/30 -translate-x-1 translate-y-1 blur-[2px] pointer-events-none">404</div>
                    </div>

                    {/* Terminal Message */}
                    <div className="space-y-6 mb-12">
                        <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight italic">
                            System_Failure: Requested_Sector_Missing
                        </h2>
                        
                        {/* Mock Terminal Log */}
                        <div className="bg-white/3 border border-white/5 p-4 rounded text-[11px] md:text-xs text-neutral-500 space-y-1">
                            <p className="text-primary font-bold tracking-widest">{`> INITIALIZING_RECOVERY_SCAN...`}</p>
                            <p>{`> Searching for node at path: "${window.location.pathname}"`}</p>
                            <p className="text-secondary/60 font-bold">{`> ERROR: [Sector_Not_Found] - Data corrupted or moved.`}</p>
                            <p className="text-primary/40">{`> Protocol: LifeFlow_OS_v2.026`}</p>
                            <p className="animate-pulse text-primary">{`> Waiting for user input...`}</p>
                        </div>
                    </div>

                    {/* Navigation Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Primary Action Button: Uses Primary Color */}
                        <Link 
                            to="/" 
                            className="flex-1 bg-primary hover:bg-primary/90 text-primary-content py-4 flex items-center justify-center gap-3 transition-all group overflow-hidden relative shadow-[0_0_20px_rgba(var(--p),0.3)]"
                        >
                            <Home size={18} className="group-hover:-translate-y-10 transition-transform duration-300" />
                            <span className="font-black uppercase tracking-widest text-sm">Return_To_Hub</span>
                            <Home size={18} className="absolute translate-y-10 group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                        
                        {/* Secondary Action Button: Uses Secondary Color Outline */}
                        <button 
                            onClick={() => window.location.reload()}
                            className="flex-1 border border-secondary/30 hover:border-secondary hover:bg-secondary/5 text-secondary py-4 flex items-center justify-center gap-3 transition-all"
                        >
                            <RefreshCw size={18} className="animate-spin-slow" />
                            <span className="font-black uppercase tracking-widest text-sm">Reboot_System</span>
                        </button>
                    </div>

                </div>

                {/* Footer Metadata */}
                <div className="mt-8 flex justify-between items-center max-w-2xl mx-auto px-2 opacity-30 italic">
                    <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-primary">Node: Dhaka_Mainframe</span>
                    <div className="h-px flex-1 mx-4 bg-primary/20"></div>
                    <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-primary">Build: Stable_2026</span>
                </div>
            </div>
        </div>
    );
};

export default NotFound;