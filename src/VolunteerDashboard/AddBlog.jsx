import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { FileText, Image as ImageIcon, Save, X, Terminal, PenTool } from 'lucide-react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { motion } from 'framer-motion';

const AddBlog = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleAddBlog = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const blogData = {
            title: form.title.value,
            image: form.image.value,
            content: form.content.value,
            status: 'draft',
            createdAt: new Date().toISOString()
        };

        try {
            const res = await axiosSecure.post('/blogs', blogData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "PROTOCOL_SUCCESS",
                    text: "BLOG_DRAFT_COMMITTED_TO_MAINFRAME",
                    icon: "success",
                    confirmButtonColor: "#ef4444"
                });
                navigate('/dashboard/content-management');
            }
        } catch {
            Swal.fire("CRITICAL_ERROR", "SYSTEM_WRITE_FAILURE", "error");
        }
    };

    return (
        <div className="p-4 md:p-10 bg-base-100 font-mono min-h-screen">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto border-2 border-base-content/10 bg-base-200/20 shadow-2xl"
            >
                {/* Tactical Header */}
                <header className="p-6 border-b-2 border-base-content/10 bg-black/40 flex justify-between items-center">
                    <div>
                        <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-1">Intelligence_Input_Node</p>
                        <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                            <PenTool size={28} className="text-secondary" /> Initialize_New_Intelligence
                        </h2>
                    </div>
                    <Terminal size={24} className="opacity-20 hidden md:block" />
                </header>

                <form onSubmit={handleAddBlog} className="p-8 md:p-12 space-y-10">
                    {/* Title Input */}
                    <div className="relative group">
                        <div className="flex items-center gap-2 mb-3 opacity-60 group-focus-within:opacity-100 transition-opacity">
                            <FileText size={18} className="text-secondary" />
                            <label className="text-xs font-black uppercase tracking-widest">01_Intelligence_Heading</label>
                        </div>
                        <input 
                            name="title" 
                            type="text" 
                            placeholder="INPUT_SUBJECT_HERE..." 
                            className="w-full bg-base-200 border-2 border-base-content/10 px-4 py-4 font-bold tracking-widest focus:border-secondary outline-none transition-all" 
                            required 
                        />
                    </div>

                    {/* Image URL Input */}
                    <div className="relative group">
                        <div className="flex items-center gap-2 mb-3 opacity-60 group-focus-within:opacity-100 transition-opacity">
                            <ImageIcon size={18} className="text-secondary" />
                            <label className="text-xs font-black uppercase tracking-widest">02_Visual_Asset_Link</label>
                        </div>
                        <input 
                            name="image" 
                            type="text" 
                            placeholder="HTTP://SYSTEM_IMAGE_PROTOCOL..." 
                            className="w-full bg-base-200 border-2 border-base-content/10 px-4 py-4 font-bold tracking-widest focus:border-secondary outline-none transition-all" 
                            required 
                        />
                    </div>

                    {/* Content Textarea */}
                    <div className="relative group">
                        <div className="flex items-center gap-2 mb-3 opacity-60 group-focus-within:opacity-100 transition-opacity">
                            <Terminal size={18} className="text-secondary" />
                            <label className="text-xs font-black uppercase tracking-widest">03_Detailed_Intelligence_Log</label>
                        </div>
                        <textarea 
                            name="content" 
                            className="w-full bg-base-200 border-2 border-base-content/10 px-4 py-4 font-bold h-64 focus:border-secondary outline-none transition-all resize-none" 
                            placeholder="BEGIN_DATA_STREAM..." 
                            required
                        ></textarea>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row gap-6 pt-6">
                        <button 
                            type="submit" 
                            className="flex-1 bg-secondary text-white py-5 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 transition-all shadow-lg border-b-4 border-red-900"
                        >
                            <Save size={20} /> Commit_To_Drafts
                        </button>
                        <button 
                            type="button" 
                            onClick={() => navigate(-1)} 
                            className="px-10 py-5 border-2 border-base-content/20 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-base-content/5 transition-all"
                        >
                            <X size={20} /> Abort_Entry
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AddBlog;