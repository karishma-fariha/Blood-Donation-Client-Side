import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield } from 'lucide-react';

const Loading = () => {
    return (
        <div className='min-h-screen bg-base-100 flex flex-col justify-center items-center font-mono p-6'>
            {/* Main Loading Container */}
            <div className="relative flex flex-col items-center">
                
                {/* Decorative Hexagon/Industrial Frame around the icon */}
                <div className="relative mb-8">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 border-t-2 border-b-2 border-secondary rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Activity size={32} className="text-secondary animate-pulse" />
                    </div>
                </div>

                {/* Main Text with Glitch Effect */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl md:text-4xl font-black uppercase tracking-[0.5em] italic flex items-center justify-center">
                        SYST<span className="text-secondary">E</span>M_L<span className="inline-block w-4 h-4 md:w-6 md:h-6 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-1"></span>ADING
                    </h1>
                    
                    {/* Status Subtext */}
                    <div className="flex flex-col items-center gap-1 opacity-40">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest animate-pulse">
                            Establishing_Secure_Node_Connection...
                        </span>
                        <div className="flex items-center gap-4 text-[8px] uppercase font-black">
                            <span className="flex items-center gap-1"><Shield size={10} /> Encryption_Active</span>
                            <span className="text-secondary">|</span>
                            <span>Auth_Level: 04</span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar (Decorative) */}
                <div className="mt-8 w-48 h-0.5 bg-base-content/10 relative overflow-hidden">
                    <motion.div 
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 h-full w-1/2 bg-linear-to-r from-transparent via-secondary to-transparent"
                    />
                </div>
            </div>

            {/* Background Aesthetic Elements */}
            <div className="fixed bottom-10 left-10 hidden lg:block opacity-20 text-[10px] font-black uppercase">
                <p>Root_Dir: /dev/null/blood_registry</p>
                <p>Status: Synchronizing_Logs</p>
            </div>
            <div className="fixed top-10 right-10 hidden lg:block opacity-20 text-[10px] font-black uppercase text-right">
                <p>Uptime: 99.9%</p>
                <p>Protocol: V2_TACTICAL</p>
            </div>
        </div>
    );
};

export default Loading;