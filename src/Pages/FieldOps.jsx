import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Radio, Phone, MapPin, Clock, ShieldCheck, Activity, 
    Filter, ChevronLeft, ChevronRight, RotateCcw 
} from 'lucide-react';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const FieldOps = () => {
    const axiosSecure = useAxiosSecure();
    const [operations, setOperations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bloodGroup, setBloodGroup] = useState('');
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 6;

    const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());

    // Data Fetching Logic (Triggers when bloodGroup or currentPage changes)
    useEffect(() => {
        const fetchActiveOps = async () => {
            try {
                setLoading(true);
                const query = `/all-active-operations?page=${currentPage}&size=${itemsPerPage}&bloodGroup=${bloodGroup}`;
                const res = await axiosSecure.get(query);
                
                // Standardize data from backend
                setOperations(res.data.result || []);
                setTotalCount(res.data.count || 0);
                setLastSync(new Date().toLocaleTimeString());
            } catch (err) {
                console.error("Fetch_Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchActiveOps();
    }, [axiosSecure, currentPage, bloodGroup]);

    const handleBloodChange = (e) => {
        setBloodGroup(e.target.value);
        setCurrentPage(0); // Reset to page 1 on new filter
    };

    const resetFilters = () => {
        setBloodGroup('');
        setCurrentPage(0);
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <div className="min-h-screen bg-base-100 pt-28 pb-12 px-4 font-mono">
            <div className="container mx-auto">
                
                {/* Header */}
                <header className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-base-content/10 pb-8">
                    <div>
                        <div className="flex items-center gap-2 text-secondary mb-2">
                            <Activity size={16} className="animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest">System_Active</span>
                        </div>
                        <h1 className="text-5xl font-black uppercase italic">
                            _Field_<span className="text-secondary underline decoration-4 underline-offset-8">Ops</span>
                        </h1>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-base-200 p-4 border-r-4 border-secondary min-w-[140px]">
                            <p className="text-[9px] font-black opacity-40 uppercase mb-1">Missions</p>
                            <p className="text-2xl font-black">{totalCount}</p>
                        </div>
                        <div className="bg-base-200 p-4 border-r-4 border-base-content/20 min-w-[140px]">
                            <p className="text-[9px] font-black opacity-40 uppercase mb-1">Last_Sync</p>
                            <p className="text-xl font-black uppercase">{lastSync}</p>
                        </div>
                    </div>
                </header>

                {/* Simplified Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 bg-base-200/50 p-4 border border-base-content/10">
                    <div className="relative flex-1">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={16} />
                        <select 
                            className="w-full bg-base-300 border-none pl-10 text-xs font-black uppercase py-3 focus:ring-1 focus:ring-secondary appearance-none"
                            value={bloodGroup}
                            onChange={handleBloodChange}
                        >
                            <option value="">FILTER_BY_BLOOD_GROUP (ALL)</option>
                            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                <option key={bg} value={bg}>{bg}</option>
                            ))}
                        </select>
                    </div>

                    <button 
                        onClick={resetFilters}
                        disabled={!bloodGroup}
                        className="flex items-center justify-center px-8 gap-2 bg-base-300 hover:bg-secondary hover:text-white disabled:opacity-20 transition-all text-[10px] font-black uppercase border border-base-content/10"
                    >
                        <RotateCcw size={14} />
                        Reset
                    </button>
                </div>

                {/* Operations Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
                    <AnimatePresence mode='wait'>
                        {loading ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-20">
                                <Radio className="animate-spin text-secondary mb-4" size={40} />
                                <span className="text-[10px] font-black uppercase opacity-40">Syncing_Field_Data...</span>
                            </div>
                        ) : operations.length > 0 ? operations.map((op, index) => (
                            <motion.div
                                key={op._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="bg-base-200/40 border border-base-content/5 p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden"
                                style={{ clipPath: 'polygon(0 0, 96% 0, 100% 12%, 100% 100%, 4% 100%, 0 88%)' }}
                            >
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 bg-secondary text-white flex items-center justify-center font-black text-xs italic">
                                            {op.bloodGroup}
                                        </div>
                                        <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">Ref_ID: {op._id.slice(-5)}</span>
                                    </div>
                                    <h3 className="text-2xl font-black uppercase">{op.recipientName}</h3>
                                    <div className="space-y-1 text-[11px] font-bold opacity-60">
                                        <div className="flex items-center gap-2"><MapPin size={12} className="text-secondary" /> {op.hospitalName}, {op.district}</div>
                                        <div className="flex items-center gap-2"><Clock size={12} className="text-secondary" /> {op.date} @ {op.time}</div>
                                    </div>
                                </div>

                                <div className="md:border-l border-base-content/10 md:pl-6 flex flex-col justify-between">
                                    <div className="mb-4 md:mb-0">
                                        <p className="text-[9px] font-black opacity-30 uppercase mb-1">Status</p>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${op.status === 'inprogress' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                                            <span className="text-[10px] font-black uppercase italic">{op.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <a href={`mailto:${op.requesterEmail}`} className="btn btn-xs btn-outline rounded-none border-base-content/20 hover:bg-secondary">
                                            <Phone size={12} className="mr-1" /> Contact
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-full border-2 border-dashed border-base-content/10 py-20 text-center opacity-20">
                                <p className="text-xs font-black uppercase tracking-[0.5em]">No_Operations_Found</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i)}
                                className={`w-10 h-10 text-[10px] font-black border transition-all ${
                                    currentPage === i 
                                    ? 'bg-secondary border-secondary text-white' 
                                    : 'bg-transparent border-base-content/10 opacity-50'
                                }`}
                            >
                                {String(i + 1).padStart(2, '0')}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FieldOps;