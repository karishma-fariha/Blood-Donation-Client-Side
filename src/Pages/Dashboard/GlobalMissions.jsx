import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { 
    Globe, 
    MapPin, 
    Calendar, 
    Clock, 
    Eye, 
    Zap, 
    Activity, 
    Shield, 
    Search,
    AlertTriangle,
    Terminal
} from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { motion } from 'framer-motion';

const GlobalMissions = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setLoading(true);
        // NOTE: If this returns 404, check your backend index.js 
        // to see if the route is app.get('/all-pending-requests') 
        // or app.get('/donation-requests')
        axiosSecure.get('/all-pending-requests')
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("SIGNAL_INTERFERENCE:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [axiosSecure]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center font-mono bg-base-100 text-secondary">
            <div className="flex flex-col items-center gap-4">
                <Terminal size={40} className="animate-bounce" />
                <span className="animate-pulse text-xl tracking-[0.3em] font-black uppercase">Decrypting_Feed...</span>
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-8 lg:p-12 bg-base-100 font-mono min-h-screen">
            
            {/* --- COMMAND HEADER --- */}
            <header className="max-w-7xl mx-auto mb-8 border-2 border-base-content/10 bg-base-200/20 shadow-2xl">
                <div className="p-6 md:p-10 flex flex-col lg:flex-row justify-between items-center gap-8 bg-black/60 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <Globe size={150} />
                    </div>

                    <div className="flex items-center gap-6 z-10">
                        <div className="p-4 bg-secondary text-white border-b-4 border-red-900 shadow-lg">
                            <Zap size={30} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-secondary uppercase tracking-[0.4em] mb-1">Live_Strategic_Operations</p>
                            <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">Global_Missions</h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 z-10 w-full lg:w-auto">
                        <div className="bg-white/5 p-4 border border-white/10">
                            <p className="text-[9px] font-black opacity-50 uppercase tracking-widest text-white">Active_Signals</p>
                            <p className="text-2xl font-black text-secondary">{requests.length}</p>
                        </div>
                        <div className="bg-white/5 p-4 border border-white/10">
                            <p className="text-[9px] font-black opacity-50 uppercase tracking-widest text-white">Comm_Status</p>
                            <p className="text-2xl font-black text-green-500 italic uppercase">Nominal</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- ERROR PROTOCOL --- */}
            {error && (
                <div className="max-w-7xl mx-auto mb-8 p-6 border-2 border-red-500 bg-red-500/10 flex items-center gap-4 text-red-500">
                    <AlertTriangle size={24} />
                    <p className="font-black uppercase tracking-widest text-sm">Protocol_Error: 404_Target_Endpoint_Not_Found</p>
                </div>
            )}

            {/* --- MISSIONS REGISTRY --- */}
            <div className="max-w-7xl mx-auto">
                {/* Desktop Table View (Hidden on mobile) */}
                <div className="hidden lg:block border-2 border-base-content/10 bg-base-200/10 shadow-xl overflow-hidden">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-base-content text-base-100 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="py-6 pl-8">Recipient_ID</th>
                                <th>Locale</th>
                                <th>Schedule</th>
                                <th>Bio_Type</th>
                                <th className="text-center pr-8">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-base-content/5">
                            {requests.map((req) => (
                                <tr key={req._id} className="hover:bg-secondary/5 transition-all group">
                                    <td className="py-6 pl-8">
                                        <div className="flex flex-col">
                                            <span className="font-black uppercase text-lg tracking-tighter italic">{req.recipientName}</span>
                                            <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">SIGNAL_REF: {req._id.slice(-6)}</span>
                                        </div>
                                    </td>
                                    <td className="text-xs font-bold uppercase opacity-70">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-secondary" />
                                            {req.recipientUpazila}, {req.recipientDistrict}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-[10px] font-black uppercase space-y-1">
                                            <div className="flex items-center gap-2 opacity-50"><Calendar size={12}/> {req.donationDate}</div>
                                            <div className="flex items-center gap-2 text-secondary"><Clock size={12}/> {req.donationTime}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="w-12 h-12 border-2 border-secondary flex items-center justify-center font-black text-lg text-secondary bg-secondary/5">
                                            {req.bloodGroup}
                                        </div>
                                    </td>
                                    <td className="text-center pr-8">
                                        <Link to={`/donation-details/${req._id}`}>
                                            <button className="px-6 py-2 border-2 border-base-content font-black text-[10px] uppercase tracking-widest hover:bg-base-content hover:text-base-100 transition-all">
                                                View_Details
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile/Tablet Card View (Visible only on smaller screens) */}
                <div className="lg:hidden space-y-4">
                    {requests.map((req) => (
                        <div key={req._id} className="border-2 border-base-content/10 bg-base-200/20 p-6 flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-black text-xl italic uppercase tracking-tighter">{req.recipientName}</h3>
                                    <p className="text-[9px] opacity-40 font-black">REF: {req._id.slice(-8)}</p>
                                </div>
                                <div className="w-10 h-10 border-2 border-secondary flex items-center justify-center font-black text-secondary">
                                    {req.bloodGroup}
                                </div>
                            </div>
                            <div className="space-y-2 border-y border-base-content/5 py-4">
                                <p className="text-xs font-bold flex items-center gap-2"><MapPin size={14} className="text-secondary"/> {req.recipientUpazila}, {req.recipientDistrict}</p>
                                <p className="text-xs font-bold flex items-center gap-2"><Calendar size={14} className="opacity-50"/> {req.donationDate}</p>
                                <p className="text-xs font-bold flex items-center gap-2"><Clock size={14} className="text-secondary"/> {req.donationTime}</p>
                            </div>
                            <Link to={`/donation-details/${req._id}`} className="w-full">
                                <button className="w-full py-4 bg-base-content text-base-100 font-black uppercase text-xs tracking-widest">
                                    Access_Briefing
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>

                {requests.length === 0 && !loading && (
                    <div className="py-32 text-center border-2 border-dashed border-base-content/10 opacity-30">
                        <Shield size={48} className="mx-auto mb-4" />
                        <h2 className="text-xl font-black uppercase tracking-[0.4em]">No_Active_Signals_Detected</h2>
                    </div>
                )}
            </div>

            {/* --- SYSTEM FOOTER --- */}
            <footer className="max-w-7xl mx-auto mt-12 pt-6 border-t border-base-content/5 flex flex-wrap justify-between gap-4 opacity-30 text-[9px] font-black uppercase tracking-[0.3em]">
                <div className="flex gap-6">
                    <span className="flex items-center gap-1"><Activity size={10}/> Data_Feed: Encryption_Active</span>
                    <span className="flex items-center gap-1"><Shield size={10}/> Node_Safety: Level_04</span>
                </div>
                <span>© Tactical_Donor_Network_Secure_Terminal_2026</span>
            </footer>
        </div>
    );
};

export default GlobalMissions;