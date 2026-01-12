import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { Plus, Trash2, Globe, FileText, AlertTriangle, Layers, Activity, Shield } from 'lucide-react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { motion } from 'framer-motion';

const ContentManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get('/all-blogs')
            .then(res => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [axiosSecure]);

    const handleStatusToggle = (id, currentStatus) => {
        const newStatus = currentStatus === 'draft' ? 'published' : 'draft';
        axiosSecure.patch(`/blogs/status/${id}`, { status: newStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setBlogs(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
                    Swal.fire({
                        title: "STATE_MODIFIED",
                        text: `INTELLIGENCE_STATUS: ${newStatus.toUpperCase()}`,
                        icon: "success",
                        confirmButtonColor: "#000"
                    });
                }
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "PURGE_RECORD?",
            text: "This intelligence asset will be permanently erased.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "YES_PURGE",
            cancelButtonText: "CANCEL"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/blogs/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        setBlogs(prev => prev.filter(b => b._id !== id));
                    }
                });
            }
        });
    };

    return (
        <div className="p-4 md:p-10 bg-base-100 font-mono min-h-screen text-base-content">
            
            {/* Header Banner */}
            <header className="max-w-7xl mx-auto mb-10 border-2 border-base-content/10 bg-base-200/20 shadow-2xl">
                <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-black/40">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-secondary text-white border-b-4 border-red-900">
                            <Layers size={32} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-secondary uppercase tracking-[0.4em] mb-1">Intelligence_Network</p>
                            <h1 className="text-3xl font-black italic uppercase tracking-tighter">Content_Registry_Node</h1>
                        </div>
                    </div>
                    
                    <Link to="/dashboard/content-management/add-blog" className="w-full md:w-auto">
                        <button className="w-full bg-secondary text-white px-8 py-4 font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:brightness-110 border-b-4 border-red-900 transition-all">
                            <Plus size={18} strokeWidth={3} /> Initialize_New_Entry
                        </button>
                    </Link>
                </div>
            </header>

            {/* Registry Table */}
            <div className="max-w-7xl mx-auto">
                <div className="border-2 border-base-content/10 bg-base-200/10 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full border-collapse">
                            <thead>
                                <tr className="bg-base-content text-base-100 border-none text-[10px] font-black uppercase tracking-widest">
                                    <th className="py-6 italic">Visual_ID</th>
                                    <th className="italic">Intelligence_Label</th>
                                    <th className="italic">System_State</th>
                                    <th className="text-center italic">Control_Panel</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-base-content/5">
                                {blogs.map(blog => (
                                    <tr key={blog._id} className="hover:bg-base-content/5 transition-colors">
                                        <td className="py-6">
                                            <div className="w-20 h-12 border-2 border-secondary/30 p-1">
                                                <img src={blog.image} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" alt="asset" />
                                            </div>
                                        </td>
                                        <td className="font-black uppercase tracking-tighter text-lg italic">
                                            {blog.title}
                                            <div className="text-[9px] font-bold opacity-30 mt-1 tracking-[0.2em]">UID: {blog._id}</div>
                                        </td>
                                        <td>
                                            <span className={`flex items-center gap-2 px-3 py-1 border font-black text-[10px] uppercase w-fit ${
                                                blog.status === 'published' 
                                                ? 'border-green-500 text-green-500 bg-green-500/10' 
                                                : 'border-yellow-500 text-yellow-500 bg-yellow-500/10'
                                            }`}>
                                                {blog.status === 'published' ? <Globe size={12}/> : <FileText size={12}/>}
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-center gap-4">
                                                <button 
                                                    onClick={() => handleStatusToggle(blog._id, blog.status)}
                                                    className="px-4 py-2 text-[10px] font-black uppercase border-2 border-base-content/20 hover:border-secondary hover:text-secondary transition-all"
                                                >
                                                    {blog.status === 'draft' ? 'Execute_Live' : 'Suspend_Feed'}
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(blog._id)} 
                                                    className="p-2 border-2 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* System Status Footer */}
                <div className="mt-6 flex flex-wrap gap-6 opacity-30 font-black text-[10px] uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Activity size={12} /> Registry_Active: {blogs.length}</span>
                    <span className="flex items-center gap-2"><Shield size={12} /> Data_Encryption: AES_256</span>
                </div>
            </div>
        </div>
    );
};

export default ContentManagement;