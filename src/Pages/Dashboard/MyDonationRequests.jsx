import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaEdit, FaEye } from 'react-icons/fa';
import { CheckCircle, XCircle, Filter, ChevronLeft, ChevronRight, Activity, MapPin, Calendar } from 'lucide-react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyDonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [count, setCount] = useState(0);
    const [itemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [filterStatus, setFilterStatus] = useState('all');

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const fetchRequests = useCallback(() => {
        axiosSecure.get(`/donation-requests/my-requests/${user?.email}?page=${currentPage}&size=${itemsPerPage}&status=${filterStatus}`)
            .then(res => {
                setRequests(res.data.result);
                setCount(res.data.count);
            });
    }, [user?.email, currentPage, itemsPerPage, filterStatus, axiosSecure]);

    useEffect(() => {
        if (user?.email) {
            fetchRequests();
        }
    }, [user?.email, fetchRequests]);

    const handleStatusUpdate = (id, newStatus) => {
        axiosSecure.patch(`/donation-requests/status/${id}`, { status: newStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    fetchRequests();
                    Swal.fire({
                        title: "PROTOCOL_UPDATED",
                        text: `Status switched to ${newStatus.toUpperCase()}`,
                        icon: "success",
                        background: "#1a1a1a",
                        color: "#fff",
                        confirmButtonColor: "#ef4444"
                    });
                }
            });
    };

    // Helper for Status Badge Styling
    const getStatusStyle = (status) => {
        switch (status) {
            case 'pending': return "border-yellow-500/50 text-yellow-500 bg-yellow-500/10";
            case 'inprogress': return "border-blue-500/50 text-blue-500 bg-blue-500/10";
            case 'done': return "border-green-500/50 text-green-500 bg-green-500/10";
            case 'canceled': return "border-red-500/50 text-red-500 bg-red-500/10";
            default: return "border-gray-500/50 text-gray-500";
        }
    };

    return (
        <div className="min-h-screen bg-base-100 p-4 md:p-8 lg:p-12 font-mono text-base-content">
            {/* Header Section */}
            <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-2 text-secondary mb-2">
                        <Activity size={16} className="animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.3em]">Operational_Logs</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">My_Requests</h2>
                </div>

                {/* Tactical Filter */}
                <div className="relative w-full lg:w-auto group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary opacity-50 group-focus-within:opacity-100">
                        <Filter size={18} />
                    </div>
                    <select
                        className="w-full lg:w-64 bg-base-200 border-2 border-base-content/10 pl-12 pr-4 py-4 text-sm font-black uppercase tracking-widest outline-none focus:border-secondary transition-all appearance-none cursor-pointer"
                        value={filterStatus}
                        onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(0); }}
                    >
                        <option value="all">Filter: ALL_PROTOCOLS</option>
                        <option value="pending">Status: PENDING</option>
                        <option value="inprogress">Status: IN_PROGRESS</option>
                        <option value="done">Status: COMPLETED</option>
                        <option value="canceled">Status: TERMINATED</option>
                    </select>
                </div>
            </div>

            {/* Main Table Container */}
            <div className="w-full border-2 border-base-content/10 bg-base-200/20 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        {/* Table Head */}
                        <thead>
                            <tr className="bg-black/40 border-b-2 border-base-content/10">
                                <th className="p-6 text-xs font-black uppercase tracking-widest text-secondary opacity-70">Recipient_ID</th>
                                <th className="p-6 text-xs font-black uppercase tracking-widest text-secondary opacity-70">Deployment_Loc</th>
                                <th className="p-6 text-xs font-black uppercase tracking-widest text-secondary opacity-70">Schedule_Time</th>
                                <th className="p-6 text-xs font-black uppercase tracking-widest text-secondary opacity-70 text-center">Protocol_Status</th>
                                <th className="p-6 text-xs font-black uppercase tracking-widest text-secondary opacity-70">Assigned_Asset</th>
                                <th className="p-6 text-xs font-black uppercase tracking-widest text-secondary opacity-70 text-right">Commands</th>
                            </tr>
                        </thead>
                        
                        <tbody className="divide-y divide-base-content/5">
                            {requests.map(req => (
                                <tr key={req._id} className="hover:bg-white/5 transition-colors">
                                    {/* Recipient info */}
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 border border-secondary flex items-center justify-center font-black text-secondary bg-secondary/5 text-xs">
                                                {req.bloodGroup}
                                            </div>
                                            <div>
                                                <p className="text-base font-black uppercase tracking-tight">{req.recipientName}</p>
                                                <p className="text-[10px] opacity-40 font-bold uppercase tracking-tighter">Blood_Class: {req.bloodGroup}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Location */}
                                    <td className="p-6">
                                        <div className="flex items-start gap-2 opacity-70">
                                            <MapPin size={14} className="mt-1 text-secondary" />
                                            <div>
                                                <p className="text-sm font-bold uppercase tracking-wide">{req.recipientDistrict}</p>
                                                <p className="text-[10px] uppercase opacity-60 italic">{req.recipientUpazila}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Date/Time */}
                                    <td className="p-6">
                                        <div className="flex items-start gap-2 opacity-70">
                                            <Calendar size={14} className="mt-1 text-secondary" />
                                            <div>
                                                <p className="text-sm font-bold uppercase tracking-wide">{req.donationDate}</p>
                                                <p className="text-[10px] uppercase opacity-60 italic">ETA: {req.donationTime}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status Badge */}
                                    <td className="p-6 text-center">
                                        <span className={`px-3 py-1 border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(req.status)}`}>
                                            [{req.status}]
                                        </span>
                                    </td>

                                    {/* Donor Assigned */}
                                    <td className="p-6">
                                        {req.status === 'inprogress' ? (
                                            <div className="border-l-2 border-blue-500 pl-3">
                                                <p className="text-[11px] font-black uppercase tracking-tight">{req.donorName}</p>
                                                <p className="text-[9px] opacity-40 font-bold truncate max-w-[120px]">{req.donorEmail}</p>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] opacity-20 italic">---WAITING---</span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="p-6">
                                        <div className="flex justify-end gap-3">
                                            {req.status === 'inprogress' && (
                                                <>
                                                    <button 
                                                        onClick={() => handleStatusUpdate(req._id, 'done')} 
                                                        className="p-2 border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white transition-all"
                                                        title="Mark Complete"
                                                    >
                                                        <CheckCircle size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleStatusUpdate(req._id, 'canceled')} 
                                                        className="p-2 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                                        title="Abort Mission"
                                                    >
                                                        <XCircle size={16} />
                                                    </button>
                                                </>
                                            )}
                                            <Link to={`/dashboard/update-donation-request/${req._id}`} className="p-2 border border-base-content/20 hover:border-secondary hover:text-secondary transition-all">
                                                <FaEdit size={16} />
                                            </Link>
                                            <Link to={`/donation-details/${req._id}`} className="p-2 border border-base-content/20 hover:border-white transition-all">
                                                <FaEye size={16} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tactical Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-6">
                <p className="text-xs font-black uppercase opacity-30 tracking-[0.2em]">Showing_Node_{currentPage + 1}_of_{numberOfPages}</p>
                
                <div className="flex items-center gap-1">
                    <button
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="p-3 border-2 border-base-content/10 disabled:opacity-20 hover:border-secondary transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="flex gap-1 px-4">
                        {pages.map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 font-black text-xs transition-all border-2 ${currentPage === page ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/20' : 'border-base-content/5 hover:border-base-content/20'}`}
                            >
                                {String(page + 1).padStart(2, '0')}
                            </button>
                        ))}
                    </div>

                    <button
                        disabled={currentPage === numberOfPages - 1}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="p-3 border-2 border-base-content/10 disabled:opacity-20 hover:border-secondary transition-all"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyDonationRequests;