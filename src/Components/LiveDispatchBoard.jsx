import React from 'react';
import { motion } from 'framer-motion';
import { 
    Activity, MapPin, Clock, ChevronRight, 
    AlertTriangle, ShieldCheck, Database, 
    Layers, User, ArrowDown, Share2 
} from 'lucide-react';
import { Link } from 'react-router';

const LiveDispatchBoard = () => {
    const logs = [
        { id: "LF-9921", group: "O-", location: "CENTRAL ICU", status: "CRITICAL", time: "2m ago", units: "3 Units", user: "Dr. Smith" },
        { id: "LF-9925", group: "A+", location: "SURGERY WING B", status: "URGENT", time: "15m ago", units: "1 Unit", user: "Staff J." },
        { id: "LF-9928", group: "B-", location: "EMERGENCY UNIT", status: "STABLE", time: "1h ago", units: "2 Units", user: "Admin K." },
        { id: "LF-9930", group: "AB+", location: "CHILDREN'S CLINIC", status: "URGENT", time: "3h ago", units: "4 Units", user: "Nurse M." },
    ];

    return (
        <section className="py-20 bg-base-100 relative overflow-hidden">
            {/* Background Grid Effect */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            <div className="container mx-auto px-4 lg:px-20 relative z-10">
                
                {/* Header with Scanning Effect */}
                <div className="relative border-l-4 border-secondary pl-6 mb-12">
                    <div className="flex items-center gap-2 text-secondary mb-2">
                        <Activity size={18} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Live Telemetry Active</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-base-content uppercase italic">
                        Blood Dispatch <span className="text-secondary opacity-80">Log-04</span>
                    </h2>
                    
                    {/* Animated Scanning Line */}
                    <motion.div 
                        animate={{ x: ['0%', '400%', '0%'] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-[-10px] left-0 h-[1px] w-24 bg-secondary shadow-[0_0_10px_#dc2626]"
                    />
                </div>

                {/* Industrial Monitoring Board */}
                <div className="w-full border border-base-content/10 bg-base-200/30 backdrop-blur-xl shadow-2xl">
                    
                    {/* Table Header */}
                    <div className="hidden lg:grid grid-cols-7 gap-4 p-5 bg-base-content/5 border-b border-base-content/10 text-[10px] font-black uppercase tracking-widest text-accent items-center">
                        <div className="flex items-center gap-2"><Database size={12}/> Dispatch ID</div>
                        <div className="flex items-center gap-2"><Layers size={12}/> Group</div>
                        <div className="flex items-center gap-2"><MapPin size={12}/> Facility</div>
                        <div className="flex items-center gap-2"><User size={12}/> Requester</div>
                        <div className="flex items-center gap-2"><ShieldCheck size={12}/> Status</div>
                        <div className="flex items-center gap-2"><Clock size={12}/> Timestamp</div>
                        <div className="text-right flex items-center justify-end gap-2"><Share2 size={12}/> Command</div>
                    </div>

                    {/* Table Rows with Staggered Animation */}
                    <div className="divide-y divide-base-content/5">
                        {logs.map((log, index) => (
                            <motion.div 
                                key={log.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ backgroundColor: "rgba(220, 38, 38, 0.03)", x: 5 }}
                                className="grid grid-cols-1 lg:grid-cols-7 gap-4 p-5 items-center transition-all cursor-crosshair"
                            >
                                {/* ID */}
                                <span className="text-xs font-mono text-accent flex items-center gap-2">
                                    <span className="w-1 h-1 bg-secondary rounded-full animate-ping"></span>
                                    {log.id}
                                </span>

                                {/* Blood Group */}
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black font-mono text-secondary tracking-tighter leading-none">{log.group}</span>
                                    <span className="text-[9px] font-bold text-accent uppercase tracking-widest">{log.units}</span>
                                </div>

                                {/* Location */}
                                <div className="text-sm font-bold text-base-content/80 uppercase tracking-tight flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-base-content/20 rotate-45"></div>
                                    {log.location}
                                </div>

                                {/* Requester */}
                                <div className="text-xs text-accent font-medium hidden lg:block">
                                    {log.user}
                                </div>

                                {/* Status */}
                                <div>
                                    <StatusBadge status={log.status} />
                                </div>

                                {/* Time */}
                                <div className="text-xs font-mono text-accent italic">
                                    [{log.time}]
                                </div>

                                {/* Action Button */}
                                <div className="flex justify-end">
                                    <Link 
                                        to={`/request/${log.id}`}
                                        className="group relative overflow-hidden flex items-center gap-2 px-5 py-2 bg-transparent border border-base-content/20 text-[10px] font-black uppercase tracking-widest hover:border-secondary transition-all"
                                    >
                                        <span className="relative z-10 group-hover:text-secondary">Intercept</span>
                                        <ChevronRight size={12} className="relative z-10 group-hover:translate-x-1 transition-transform group-hover:text-secondary" />
                                        <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-secondary/5 transition-transform duration-300"></div>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Industrial "View More" Command Button */}
                <div className="mt-12 flex flex-col items-center">
                    <motion.div 
                        whileHover={{ y: 5 }}
                        className="flex flex-col items-center gap-4 group cursor-pointer"
                    >
                        <Link to="/donation-requests" className="flex flex-col items-center">
                            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-secondary to-secondary mb-2 animate-bounce"></div>
                            <button className="px-10 py-4 bg-base-content text-base-100 text-xs font-black uppercase tracking-[0.3em] hover:bg-secondary transition-all flex items-center gap-3 shadow-2xl">
                                Expand Registry <ArrowDown size={14} />
                            </button>
                        </Link>
                        <span className="text-[9px] font-mono text-accent uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            Decrypting additional entries...
                        </span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const StatusBadge = ({ status }) => {
    const colors = {
        CRITICAL: "text-red-600 border-red-600 shadow-[0_0_5px_rgba(220,38,38,0.2)]",
        URGENT: "text-orange-500 border-orange-500",
        STABLE: "text-green-500 border-green-500"
    };

    return (
        <div className={`flex items-center gap-1.5 px-2 py-1 border text-[9px] font-black uppercase tracking-tighter w-fit bg-base-100 ${colors[status]}`}>
            <div className={`w-1 h-1 rounded-full bg-current ${status === "CRITICAL" ? 'animate-pulse' : ''}`}></div>
            {status}
        </div>
    );
};

export default LiveDispatchBoard;