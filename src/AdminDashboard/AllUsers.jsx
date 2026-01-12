import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Shield, User, ShieldAlert, Lock, Unlock, 
    Filter, Search, MoreHorizontal, UserCheck, 
    Activity, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight 
} from 'lucide-react';
import { AuthContext } from '../Provider/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user: currentUser } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    // --- PAGINATION STATE ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosSecure.get(`/users?status=${filter}`);
                setUsers(res.data);
                setCurrentPage(1); // Reset to page 1 on filter change
            } catch (error) {
                console.error("REGISTRY_LOAD_ERROR", error);
                Swal.fire({
                    icon: 'error',
                    title: 'TERMINAL_ERROR',
                    text: 'Failed to synchronize user data.',
                    background: '#1a1a1a',
                    color: '#fff',
                    confirmButtonColor: '#ef4444'
                });
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [filter, axiosSecure]);

    // --- PAGINATION LOGIC ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleFilterChange = (e) => {
        setLoading(true);
        setFilter(e.target.value);
    };

    const handleRoleChange = async (id, newRole, userEmail) => {
        if (userEmail === currentUser?.email) {
            return Swal.fire("ACCESS_DENIED", "Self-role modification restricted.", "warning");
        }

        try {
            const res = await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
            if (res.data.modifiedCount > 0) {
                setUsers(prev => prev.map(u => u._id === id ? { ...u, role: newRole } : u));
                Swal.fire({
                    title: "AUTH_UPDATED",
                    text: `Asset role escalated to ${newRole.toUpperCase()}`,
                    icon: "success",
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire("PATCH_ERROR", "Internal authority failure.", "error");
        }
    };

    const handleStatusChange = async (id, newStatus, userEmail) => {
        if (userEmail === currentUser?.email) {
            return Swal.fire("ACCESS_DENIED", "Self-blocking is protocol-prohibited.", "warning");
        }

        try {
            const res = await axiosSecure.patch(`/users/status/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                if (filter !== 'all' && newStatus !== filter) {
                    setUsers(prev => prev.filter(u => u._id !== id));
                } else {
                    setUsers(prev => prev.map(u => u._id === id ? { ...u, status: newStatus } : u));
                }
                Swal.fire("STATUS_COMMITTED", `Asset status: ${newStatus.toUpperCase()}`, "success");
            }
        } catch (error) {
            Swal.fire("PATCH_ERROR", "Status sync failure.", "error");
        }
    };

    return (
        <div className="min-h-screen bg-base-100 p-4 md:p-8 lg:p-12 font-mono selection:bg-secondary selection:text-white">
            
            {/* --- HEADER SECTION --- */}
            <header className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b-2 border-base-content/5 pb-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-secondary">
                        <Shield size={20} className="animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.5em]">Auth: Level_Alpha_Admin</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Asset_Registry</h1>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative group">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:text-secondary transition-colors" size={16} />
                        <select 
                            value={filter}
                            onChange={handleFilterChange}
                            className="select select-bordered select-sm pl-10 bg-base-200 border-2 border-base-content/10 rounded-none focus:border-secondary focus:outline-none font-bold uppercase text-[10px] tracking-widest w-full md:w-48"
                        >
                            <option value="all">ALL_ASSETS</option>
                            <option value="active">STATUS: ACTIVE</option>
                            <option value="blocked">STATUS: RESTRICTED</option>
                        </select>
                    </div>
                </div>
            </header>

            {/* --- DATA TABLE SECTION --- */}
            <div className="relative border-2 border-base-content/10 bg-base-200/20 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary/20 animate-scan z-20 pointer-events-none" />
                
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-base-content/5 text-base-content/50 border-b-2 border-base-content/10 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="py-6 pl-8">IDENTIFIER_NODE</th>
                                <th>AUTHORIZATION</th>
                                <th>SYSTEM_STATUS</th>
                                <th className="text-right pr-8">PROTOCOL_ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-content/5">
                            <AnimatePresence mode="popLayout">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="py-24 text-center">
                                            <div className="flex flex-col items-center gap-4 opacity-50">
                                                <Activity size={32} className="animate-spin text-secondary" />
                                                <span className="tracking-[0.4em] uppercase text-xs">Decrypting_Registry...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : currentUsers.length > 0 ? (
                                    currentUsers.map((u, index) => (
                                        <motion.tr 
                                            key={u._id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="group hover:bg-secondary/5 transition-colors"
                                        >
                                            <td className="py-5 pl-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <div className="w-12 h-12 border-2 border-base-content/10 overflow-hidden bg-base-300">
                                                            <img 
                                                                src={u.avatar || "https://i.ibb.co/vBR649p/user-placeholder.png"} 
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                                                alt="Asset" 
                                                            />
                                                        </div>
                                                        {u.status === 'active' && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-base-100 rounded-full" />}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-black text-sm uppercase italic">{u.name}</span>
                                                            {u.email === currentUser?.email && (
                                                                <span className="bg-secondary text-white text-[8px] font-black px-2 py-0.5 tracking-tighter uppercase">YOU</span>
                                                            )}
                                                        </div>
                                                        <div className="text-[10px] font-bold opacity-40 uppercase tracking-tighter">{u.email}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 border-2 text-[10px] font-black uppercase tracking-widest ${
                                                    u.role === 'admin' ? 'border-secondary text-secondary' : 
                                                    u.role === 'volunteer' ? 'border-blue-500 text-blue-500' : 
                                                    'border-base-content/20 text-base-content/40'
                                                }`}>
                                                    <Shield size={12} />
                                                    {u.role}
                                                </div>
                                            </td>

                                            <td>
                                                <div className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                                                    u.status === 'active' ? 'text-green-500' : 'text-red-500'
                                                }`}>
                                                    {u.status === 'active' ? <UserCheck size={14} /> : <ShieldAlert size={14} />}
                                                    {u.status}
                                                </div>
                                            </td>

                                            <td className="text-right pr-8">
                                                <div className="flex justify-end gap-2">
                                                    <div className="flex border-2 border-base-content/10 divide-x-2 divide-base-content/10">
                                                        <button 
                                                            onClick={() => handleRoleChange(u._id, 'admin', u.email)}
                                                            className={`p-2 hover:bg-secondary hover:text-white transition-colors disabled:opacity-20`}
                                                            disabled={u.role === 'admin' || u.email === currentUser?.email}
                                                            title="Promote to Admin"
                                                        >
                                                            <Shield size={14} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleRoleChange(u._id, 'volunteer', u.email)}
                                                            className={`p-2 hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-20`}
                                                            disabled={u.role === 'volunteer' || u.email === currentUser?.email}
                                                            title="Make Volunteer"
                                                        >
                                                            <User size={14} />
                                                        </button>
                                                    </div>

                                                    <button 
                                                        onClick={() => handleStatusChange(u._id, u.status === 'active' ? 'blocked' : 'active', u.email)}
                                                        className={`px-4 py-2 border-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                                                            u.status === 'active' 
                                                            ? 'border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white' 
                                                            : 'border-green-500/50 text-green-500 hover:bg-green-500 hover:text-white'
                                                        }`}
                                                        disabled={u.email === currentUser?.email}
                                                    >
                                                        {u.status === 'active' ? <Lock size={12} /> : <Unlock size={12} />}
                                                        <span className="hidden md:inline">{u.status === 'active' ? 'Block' : 'Unblock'}</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-20 text-center opacity-30 italic uppercase text-xs tracking-[0.5em]">
                                            No_Assets_Found_In_Node
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* --- TACTICAL PAGINATION BAR --- */}
                {users.length > itemsPerPage && (
                    <div className="p-4 bg-base-content/5 border-t-2 border-base-content/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                            Sector_Range: {indexOfFirstItem + 1}—{Math.min(indexOfLastItem, users.length)} // Total_Data_Nodes: {users.length}
                        </div>
                        
                        <div className="flex items-center gap-1">
                            <button 
                                onClick={() => paginate(1)} 
                                disabled={currentPage === 1}
                                className="p-2 border-2 border-base-content/10 hover:border-secondary hover:text-secondary disabled:opacity-20 transition-all"
                            >
                                <ChevronsLeft size={16} />
                            </button>
                            <button 
                                onClick={() => paginate(currentPage - 1)} 
                                disabled={currentPage === 1}
                                className="p-2 border-2 border-base-content/10 hover:border-secondary hover:text-secondary disabled:opacity-20 transition-all"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            
                            <div className="px-6 py-2 border-2 border-secondary/30 bg-secondary/5 mx-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-secondary">
                                    Page_{currentPage.toString().padStart(2, '0')}_of_{totalPages.toString().padStart(2, '0')}
                                </span>
                            </div>

                            <button 
                                onClick={() => paginate(currentPage + 1)} 
                                disabled={currentPage === totalPages}
                                className="p-2 border-2 border-base-content/10 hover:border-secondary hover:text-secondary disabled:opacity-20 transition-all"
                            >
                                <ChevronRight size={16} />
                            </button>
                            <button 
                                onClick={() => paginate(totalPages)} 
                                disabled={currentPage === totalPages}
                                className="p-2 border-2 border-base-content/10 hover:border-secondary hover:text-secondary disabled:opacity-20 transition-all"
                            >
                                <ChevronsRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* --- SYSTEM METRICS FOOTER --- */}
            <footer className="mt-8 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.3em] opacity-30">
                <div className="flex gap-6">
                    <span>Registry_Count: {users.length}</span>
                    <span>Node: GLOBAL_SVR_01</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live_Satellite_Sync_Active
                </div>
            </footer>
        </div>
    );
};

export default AllUsers;