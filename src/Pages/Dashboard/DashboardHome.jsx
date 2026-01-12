import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { 
    Edit3, Trash2, Eye, Activity, 
    User, MapPin, Clock, Check, 
    X, ChevronRight, LayoutDashboard,
    ExternalLink
} from 'lucide-react';
import { AuthContext } from '../../Provider/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const DashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [recentRequests, setRecentRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/donation-requests/recent/${user.email}`)
                .then(res => {
                    setRecentRequests(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("SYSTEM_FETCH_ERROR", err);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "DECOMMISSION_LOG?",
            text: "This operation cannot be reversed.",
            icon: "warning",
            showCancelButton: true,
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#ef4444',
            confirmButtonText: "CONFIRM_DELETE"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/donation-requests/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            setRecentRequests(recentRequests.filter(req => req._id !== id));
                            Swal.fire({
                                title: "DELETED",
                                icon: "success",
                                background: '#1a1a1a',
                                color: '#fff'
                            });
                        }
                    });
            }
        });
    };

    const handleStatusUpdate = (id, newStatus) => {
        axiosSecure.patch(`/donation-requests/status/${id}`, { status: newStatus })
        .then(res => {
            if (res.data.modifiedCount > 0) {
                setRecentRequests(recentRequests.map(req =>
                    req._id === id ? { ...req, status: newStatus } : req
                ));
                Swal.fire({
                    title: "STATUS_SYNCED",
                    text: `Status set to: ${newStatus.toUpperCase()}`,
                    icon: "success",
                    background: '#1a1a1a',
                    color: '#fff'
                });
            }
        });
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 font-mono italic">
            <Activity className="animate-spin text-secondary mb-4" size={48} />
            <p className="animate-pulse">INITIALIZING_COMMAND_INTERFACE...</p>
        </div>
    );

    return (
        <div className="p-4 md:p-8 font-mono selection:bg-secondary selection:text-white">
            
            {/* --- HERO / WELCOME SECTION --- */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative bg-secondary p-8 md:p-12 mb-10 overflow-hidden border-b-8 border-black/20"
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 opacity-10">
                    <LayoutDashboard size={240} />
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 text-white/70 mb-4">
                        <div className="h-[2px] w-12 bg-white/40"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.5em]">Session: Active_Operator</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-4">
                        Welcome_Back, <br />
                        <span className="text-black/30">{user?.displayName}</span>
                    </h1>
                    <p className="text-white/80 max-w-xl text-sm font-bold uppercase tracking-wider">
                        Command Interface for blood donation logistics. Monitor active requests and authorize status updates.
                    </p>
                </div>
            </motion.div>

            {/* --- RECENT LOGS SECTION --- */}
            <section className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6 border-l-4 border-secondary pl-4">
                    <div>
                        <h2 className="text-xl font-black uppercase italic tracking-tight">Recent_Mission_Logs</h2>
                        <p className="text-[10px] opacity-50 uppercase font-bold">Latest 3 entries in registry</p>
                    </div>
                    {recentRequests.length > 0 && (
                        <Link to="/dashboard/my-donation-requests" className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-secondary transition-colors group">
                            Full_Registry <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                        </Link>
                    )}
                </div>

                {recentRequests.length > 0 ? (
                    <div className="bg-base-200/50 border-2 border-base-content/10 overflow-hidden relative">
                         {/* Scanline Effect */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-secondary/20 animate-scan pointer-events-none" />
                        
                        <div className="overflow-x-auto">
                            <table className="table w-full border-collapse">
                                <thead className="bg-base-content/10">
                                    <tr className="border-b-2 border-base-content/10">
                                        <th className="rounded-none text-[10px] font-black uppercase">[RECIPIENT]</th>
                                        <th className="text-[10px] font-black uppercase">[SECTOR]</th>
                                        <th className="text-[10px] font-black uppercase">[TEMPORAL_DATA]</th>
                                        <th className="text-[10px] font-black uppercase">[STATUS]</th>
                                        <th className="text-[10px] font-black uppercase">[ASSET_INTEL]</th>
                                        <th className="rounded-none text-[10px] font-black uppercase text-center">[COMMANDS]</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-base-content/5">
                                    {recentRequests.map((request) => (
                                        <tr key={request._id} className="hover:bg-base-content/[0.02] transition-colors">
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-secondary text-white flex items-center justify-center font-black italic text-sm shrink-0">
                                                        {request.bloodGroup}
                                                    </div>
                                                    <span className="font-black uppercase text-sm leading-none">{request.recipientName}</span>
                                                </div>
                                            </td>
                                            <td className="text-[10px] font-bold uppercase opacity-70">
                                                <div className="flex items-center gap-1"><MapPin size={10}/> {request.recipientDistrict}</div>
                                                <div className="ml-3 opacity-50 italic">{request.recipientUpazila}</div>
                                            </td>
                                            <td>
                                                <div className="text-[10px] font-bold">{request.donationDate}</div>
                                                <div className="text-[9px] opacity-40"><Clock size={8} className="inline mr-1"/>{request.donationTime}</div>
                                            </td>
                                            <td>
                                                <span className={`text-[9px] font-black px-2 py-1 uppercase border ${
                                                    request.status === 'pending' ? 'border-yellow-500 text-yellow-600 bg-yellow-500/5' :
                                                    request.status === 'inprogress' ? 'border-blue-500 text-blue-600 bg-blue-500/5' :
                                                    request.status === 'done' ? 'border-green-500 text-green-600 bg-green-500/5' :
                                                    'border-base-content/20 opacity-40'
                                                }`}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td className="text-[10px]">
                                                {request.status === 'inprogress' ? (
                                                    <div className="border-l-2 border-blue-500 pl-2">
                                                        <p className="font-black uppercase tracking-tighter">{request.donorName}</p>
                                                        <p className="opacity-40 italic">{request.donorEmail}</p>
                                                    </div>
                                                ) : <span className="opacity-20 italic">AWAITING_ASSET</span>}
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-center gap-1">
                                                    {request.status === 'inprogress' && (
                                                        <div className="flex gap-1 mr-2 border-r-2 border-base-content/10 pr-2">
                                                            <button onClick={() => handleStatusUpdate(request._id, 'done')} className="btn btn-xs bg-green-600 text-white rounded-none border-none hover:bg-green-700 font-black"><Check size={12}/></button>
                                                            <button onClick={() => handleStatusUpdate(request._id, 'canceled')} className="btn btn-xs bg-red-600 text-white rounded-none border-none hover:bg-red-700 font-black"><X size={12}/></button>
                                                        </div>
                                                    )}
                                                    <Link to={`/dashboard/update-donation-request/${request._id}`} className="p-2 hover:bg-blue-500 hover:text-white transition-colors border border-transparent hover:border-blue-600">
                                                        <Edit3 size={14} />
                                                    </Link>
                                                    <button onClick={() => handleDelete(request._id)} className="p-2 hover:bg-red-500 hover:text-white transition-colors border border-transparent hover:border-red-600">
                                                        <Trash2 size={14} />
                                                    </button>
                                                    <Link to={`/donation-details/${request._id}`} className="p-2 hover:bg-secondary hover:text-white transition-colors border border-transparent hover:border-secondary">
                                                        <Eye size={14} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-base-content/10 p-20 text-center">
                        <Activity className="mx-auto text-base-content/10 mb-4" size={48} />
                        <p className="text-xs font-black uppercase opacity-30 italic tracking-[0.3em]">No_Active_Logs_In_Registry</p>
                        <Link to="/dashboard/create-donation-request" className="btn btn-outline btn-secondary rounded-none mt-6 uppercase text-xs font-black">
                            Initialize_New_Request
                        </Link>
                    </div>
                )}

                <div className="mt-8">
                    <Link to="/dashboard/my-donation-requests">
                        <button className="group relative bg-black text-white px-10 py-4 font-black uppercase text-xs tracking-[0.3em] overflow-hidden">
                            <span className="relative z-10 flex items-center gap-3">
                                View_All_System_Logs <ExternalLink size={14}/>
                            </span>
                            <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </Link>
                </div>
            </section>

            {/* --- SYSTEM FOOTER METRICS --- */}
            <footer className="mt-20 border-t-2 border-base-content/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-8 text-[9px] font-black uppercase opacity-30 tracking-[0.2em]">
                    <span>Terminal_Node: {user?.uid?.slice(0, 8)}</span>
                    <span>Lat: 23.8103° N, Lon: 90.4125° E</span>
                </div>
                <div className="text-[9px] font-black uppercase opacity-30 tracking-[0.2em]">
                    System_Clock: {new Date().toLocaleTimeString()}
                </div>
            </footer>
        </div>
    );
};

export default DashboardHome;