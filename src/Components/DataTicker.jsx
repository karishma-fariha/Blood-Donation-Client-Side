import React from 'react';
import { Activity, ShieldCheck, Heart, Zap, Globe, AlertCircle } from 'lucide-react';

const DataTicker = () => {
    const tickerItems = [
        { icon: <Activity size={14} />, label: "SYSTEM STATUS", value: "OPERATIONAL", color: "text-green-500" },
        { icon: <Globe size={14} />, label: "REGIONAL NODES", value: "24 ACTIVE", color: "text-white" },
        { icon: <AlertCircle size={14} />, label: "EMERGENCY ALERT", value: "B+ REQUIRED ATCTOR 4", color: "text-red-500 animate-pulse" },
        { icon: <Heart size={14} />, label: "LIVES SAVED", value: "4,290", color: "text-red-500" },
        { icon: <Zap size={14} />, label: "REQUEST VOLUME", value: "HIGH", color: "text-yellow-500" },
        { icon: <ShieldCheck size={14} />, label: "SECURE LINK", value: "ESTABLISHED", color: "text-blue-500" },
    ];

    return (
        <div className="w-full bg-neutral-950 border-y border-white/5 py-4 overflow-hidden select-none flex items-center shadow-2xl relative z-20">
            {/* Left Static "LIVE" Label */}
            <div className="absolute left-0 z-30 bg-neutral-950 px-4 py-4 border-r border-white/10 hidden md:flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase">Live_Feed</span>
            </div>

            {/* The Animated Wrapper */}
            <div className="flex animate-marquee whitespace-nowrap">
                {/* We repeat the items 3 times to ensure a perfectly seamless loop on all screens */}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center">
                        {tickerItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-6 px-12 border-r border-white/5">
                                <div className="flex items-center gap-3">
                                    <span className="text-secondary opacity-80">{item.icon}</span>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                                            {item.label}
                                        </span>
                                        <span className={`text-xs font-black font-mono tracking-wider ${item.color}`}>
                                            {item.value}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Subtle overlay gradients for fade effect on edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-neutral-950 to-transparent pointer-events-none z-20"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-neutral-950 to-transparent pointer-events-none z-20"></div>
        </div>
    );
};

export default DataTicker;