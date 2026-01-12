import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, ShieldAlert, Activity } from 'lucide-react';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            console.log("Form Submitted:", formData);
            toast.success("DISPATCH SENT: Transmission successful.");
            setIsSubmitting(false);
            setFormData({ name: '', email: '', message: '' });
        }, 1500);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        /* CHANGED: Light Background (Slate-50) and Dark Text */
        <section className="py-24 relative overflow-hidden font-mono" id="contact">
            
            {/* --- LIGHT INDUSTRIAL GRID --- */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            <div className="container mx-auto px-4 lg:px-20 relative z-10">
                
                {/* 1. HEADER: Protocol Title */}
                <div className="mb-16 border-l-4 border-secondary pl-6">
                    <div className="flex items-center gap-3 mb-2">
                        <ShieldAlert className="text-secondary animate-pulse" size={20} />
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-secondary">Emergency_Response_Protocol</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                        Establish <span className="text-secondary">Communication</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* 2. LEFT COLUMN: Dispatch Info */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Box changed to white with subtle shadow/border */}
                        <div className="bg-white border border-neutral-200 p-8 relative overflow-hidden group shadow-sm">
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                                <Activity size={80} color="black" />
                            </div>
                            
                            <h3 className="text-xl font-black uppercase italic mb-6 flex items-center gap-2 text-neutral-900">
                                <div className="w-2 h-2 bg-green-500 rounded-full" /> Dispatch_Hub_Active
                            </h3>
                            
                            <p className="text-sm text-neutral-500 leading-relaxed mb-8 uppercase tracking-wide">
                                24/7 Monitoring active. Direct lines are open for emergency blood synchronization and hospital logistics support.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-secondary/5 border border-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                                        <Phone size={20} className="text-secondary group-hover:text-white" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-neutral-400 uppercase block font-bold">Priority_Line</span>
                                        <span className="text-lg font-black tracking-tighter text-neutral-800">+880 1234 567 890</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-neutral-100 border border-neutral-200 flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                                        <Mail size={20} className="text-neutral-500 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-neutral-400 uppercase block font-bold">Secure_Email</span>
                                        <span className="text-lg font-black tracking-tighter uppercase text-neutral-800">support@lifeflow.io</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-neutral-100 border border-neutral-200 flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                                        <MapPin size={20} className="text-neutral-500 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-neutral-400 uppercase block font-bold">HQ_Coordinates</span>
                                        <span className="text-lg font-black tracking-tighter uppercase italic text-neutral-800">Dhaka_Node, Bangladesh</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-100 border border-neutral-200 p-4 flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase italic text-neutral-500">System_Integrity: Secured</span>
                            <span className="text-[10px] font-mono text-secondary animate-pulse font-bold">● SIGNAL_STRONG</span>
                        </div>
                    </div>

                    {/* 3. RIGHT COLUMN: Secure Form */}
                    <div className="lg:col-span-7 bg-white border border-neutral-200 p-8 md:p-12 relative shadow-sm">
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-secondary/20" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-secondary/20" />

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">_Dispatcher_Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="REQUIRED"
                                        className="w-full bg-slate-50 border border-neutral-200 px-4 py-4 focus:border-secondary focus:outline-none text-neutral-900 font-bold transition-all placeholder:text-neutral-300"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">_Return_Channel_Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="REQUIRED"
                                        className="w-full bg-slate-50 border border-neutral-200 px-4 py-4 focus:border-secondary focus:outline-none text-neutral-900 font-bold transition-all placeholder:text-neutral-300"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">_Transmission_Details</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="ENTER_MESSAGE_HERE..."
                                    className="w-full bg-slate-50 border border-neutral-200 px-4 py-4 focus:border-secondary focus:outline-none text-neutral-900 font-bold transition-all placeholder:text-neutral-300 resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`group relative w-full overflow-hidden py-5 font-black uppercase italic tracking-[0.2em] transition-all
                                    ${isSubmitting ? 'bg-neutral-200 cursor-not-allowed text-neutral-400' : 'bg-secondary hover:bg-red-700 text-white shadow-lg shadow-red-900/10'}
                                `}
                            >
                                <div className="flex items-center justify-center gap-3 relative z-10">
                                    {isSubmitting ? (
                                        <>SENDING_SIGNAL...</>
                                    ) : (
                                        <>
                                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            Execute_Transmission
                                        </>
                                    )}
                                </div>
                                <motion.div 
                                    className="absolute inset-0 bg-white/10"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactUs;