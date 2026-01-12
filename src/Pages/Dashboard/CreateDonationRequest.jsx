import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { 
    Droplets, Activity, MapPin, Hospital, 
    Clock, Calendar, MessageSquare, User, 
    AlertTriangle, Send, ShieldAlert 
} from 'lucide-react';
import { AuthContext } from '../../Provider/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const CreateDonationRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initRegistry = async () => {
            try {
                const userRes = await axiosSecure.get(`/users/${user?.email}`);
                setDbUser(userRes.data);
                
                const distRes = await fetch('/District.json');
                const distData = await distRes.json();
                setDistricts(distData);

                const upzRes = await fetch('/Upozila.json');
                const upzData = await upzRes.json();
                setUpazilas(upzData);
            } catch (err) {
                console.error("REGISTRY_INIT_FAILURE", err);
            } finally {
                setLoading(false);
            }
        };
        initRegistry();
    }, [user, axiosSecure]);

    const handleDistrictChange = (e) => {
        const selectedDistrictName = e.target.value;
        const district = districts.find(d => d.name === selectedDistrictName);
        if (district) {
            const filtered = upazilas.filter(u => u.district_id.toString() === district.id.toString());
            setFilteredUpazilas(filtered);
        } else {
            setFilteredUpazilas([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (dbUser?.status === 'blocked') {
            Swal.fire({
                title: "ACCESS_DENIED",
                text: "Blocked assets cannot initiate donation protocols.",
                icon: "error",
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        const form = e.target;
        const requestData = {
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            recipientName: form.recipientName.value,
            recipientDistrict: form.district.value,
            recipientUpazila: form.upazila.value,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            bloodGroup: form.bloodGroup.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            requestMessage: form.requestMessage.value,
            status: 'pending',
            createdAt: new Date()
        };

        try {
            const res = await axiosSecure.post('/donation-requests', requestData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "DEPLOYED",
                    text: "Donation request broadcasted to the network.",
                    icon: "success",
                    background: '#1a1a1a',
                    color: '#fff',
                    confirmButtonColor: '#3b82f6'
                });
                navigate('/dashboard/my-donation-requests');
            }
        } catch (error) {
            Swal.fire("SYNC_ERROR", "Transmission failed.", "error");
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <Activity className="animate-spin text-secondary" size={48} />
        </div>
    );

    return (
        <div className="min-h-screen bg-base-100 p-4 md:p-8 lg:p-12 font-mono selection:bg-secondary selection:text-white">
            
            {/* --- TERMINAL HEADER --- */}
            <header className="max-w-5xl mx-auto mb-10 border-b-2 border-base-content/10 pb-6">
                <div className="flex items-center gap-3 text-secondary mb-2">
                    <Droplets size={24} className="animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-[0.4em]">Protocol: Request_Initiation_v4.0</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">New_Donation_Log</h1>
            </header>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto"
            >
                {dbUser?.status === 'blocked' && (
                    <div className="mb-8 p-4 border-2 border-red-500 bg-red-500/10 flex items-center gap-4 text-red-500 animate-pulse">
                        <ShieldAlert size={24} />
                        <span className="font-black uppercase tracking-widest text-sm">System_Status: Restricted_Access_Account_Blocked</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-base-200/30 border-2 border-base-content/10 relative overflow-hidden">
                    {/* Decorative Scanner Line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary/30 animate-scan z-10 pointer-events-none" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-base-content/10">
                        
                        {/* LEFT COLUMN: SOURCE & TARGET */}
                        <div className="p-6 md:p-10 space-y-8">
                            <section>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-6 flex items-center gap-2">
                                    <User size={12}/> Origin_Intel
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-secondary">[REQUESTER_NAME]</label>
                                        <input type="text" value={user?.displayName} readOnly className="w-full bg-base-content/5 border-2 border-base-content/10 p-3 text-sm font-bold uppercase outline-none opacity-60" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-secondary">[REQUESTER_EMAIL]</label>
                                        <input type="text" value={user?.email} readOnly className="w-full bg-base-content/5 border-2 border-base-content/10 p-3 text-sm font-bold uppercase outline-none opacity-60" />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-6 flex items-center gap-2">
                                    <Activity size={12}/> Target_Intel
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-secondary">[RECIPIENT_NAME]</label>
                                        <input type="text" name="recipientName" required className="w-full bg-base-100 border-2 border-base-content/20 p-3 text-sm font-bold focus:border-secondary outline-none transition-colors placeholder:opacity-20" placeholder="IDENTIFY RECIPIENT..." />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-secondary">[BLOOD_GROUP_REQUIRED]</label>
                                        <select name="bloodGroup" required className="w-full bg-base-100 border-2 border-base-content/20 p-3 text-sm font-bold focus:border-secondary outline-none appearance-none cursor-pointer">
                                            <option value="">SELECT TYPE...</option>
                                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                                                <option key={group} value={group}>{group}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* RIGHT COLUMN: LOGISTICS */}
                        <div className="p-6 md:p-10 space-y-8 bg-base-content/[0.02]">
                            <section>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-6 flex items-center gap-2">
                                    <MapPin size={12}/> Deployment_Coordinates
                                </h3>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-secondary">[DISTRICT]</label>
                                        <select name="district" required onChange={handleDistrictChange} className="w-full bg-base-100 border-2 border-base-content/20 p-3 text-sm font-bold focus:border-secondary outline-none cursor-pointer">
                                            <option value="">SELECT...</option>
                                            {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-secondary">[UPAZILA]</label>
                                        <select name="upazila" required disabled={filteredUpazilas.length === 0} className="w-full bg-base-100 border-2 border-base-content/20 p-3 text-sm font-bold focus:border-secondary outline-none disabled:opacity-20 cursor-pointer">
                                            <option value="">SELECT...</option>
                                            {filteredUpazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-secondary">[MEDICAL_FACILITY]</label>
                                        <div className="relative">
                                            <Hospital className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20" size={16}/>
                                            <input type="text" name="hospitalName" required className="w-full bg-base-100 border-2 border-base-content/20 p-3 pr-10 text-sm font-bold focus:border-secondary outline-none" placeholder="HOSPITAL NAME..." />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-secondary">[FULL_ADDRESS]</label>
                                        <input type="text" name="fullAddress" required className="w-full bg-base-100 border-2 border-base-content/20 p-3 text-sm font-bold focus:border-secondary outline-none" placeholder="STREET, BLOCK, AREA..." />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-6 flex items-center gap-2">
                                    <Clock size={12}/> Temporal_Data
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-secondary">[DATE]</label>
                                        <input type="date" name="donationDate" required className="w-full bg-base-100 border-2 border-base-content/20 p-3 text-sm font-bold focus:border-secondary outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-secondary">[TIME]</label>
                                        <input type="time" name="donationTime" required className="w-full bg-base-100 border-2 border-base-content/20 p-3 text-sm font-bold focus:border-secondary outline-none" />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* MESSAGE AREA */}
                    <div className="p-6 md:p-10 border-t-2 border-base-content/10">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-secondary flex items-center gap-2">
                                <MessageSquare size={12}/> [MISSION_BRIEF / REQUEST_MESSAGE]
                            </label>
                            <textarea name="requestMessage" required className="w-full bg-base-100 border-2 border-base-content/20 p-4 h-32 text-sm font-bold focus:border-secondary outline-none resize-none" placeholder="EXPLAIN THE URGENCY OR SPECIFIC REQUIREMENTS..."></textarea>
                        </div>

                        <div className="mt-10 flex flex-col md:flex-row items-center gap-6">
                            <button
                                type="submit"
                                disabled={dbUser?.status === 'blocked'}
                                className="group relative overflow-hidden bg-secondary text-white px-10 py-4 font-black uppercase tracking-[0.2em] text-sm hover:bg-secondary/90 transition-all disabled:opacity-20 disabled:cursor-not-allowed w-full md:w-auto"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {dbUser?.status === 'blocked' ? "LOG_RESTRICTED" : "INITIALIZE_BROADCAST"}
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </span>
                            </button>
                            <div className="text-[9px] font-bold opacity-30 uppercase leading-tight">
                                By clicking broadcast, you confirm all data is accurate.<br/>
                                Misuse of the terminal will lead to clearance revocation.
                            </div>
                        </div>
                    </div>
                </form>

                {/* FOOTER METRICS */}
                <footer className="mt-8 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.3em] opacity-30">
                    <div className="flex gap-6">
                        <span>TERMINAL_ID: REQ_772</span>
                        <span>LATENCY: 24ms</span>
                    </div>
                    <div className="flex items-center gap-2 italic">
                        SECURE_ENCRYPTION_ACTIVE
                    </div>
                </footer>
            </motion.div>
        </div>
    );
};

export default CreateDonationRequest;