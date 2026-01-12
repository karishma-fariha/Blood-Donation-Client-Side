import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { 
    User, Mail, Droplet, MapPin, Hospital, 
    Calendar, Clock, MessageSquare, Save, Activity, Shield 
} from 'lucide-react';
import { motion } from 'framer-motion';

// ✅ SUB-COMPONENTS DECLARED OUTSIDE TO PREVENT RENDER RESET
const TacticalField = ({ label, icon: Icon, children, readOnly = false }) => (
    <div className="relative group w-full">
        <div className="flex items-center gap-2 mb-3 opacity-60 group-focus-within:opacity-100 transition-opacity">
            <Icon size={18} className="text-secondary" />
            <label className="text-xs md:text-sm font-black uppercase tracking-widest">{label}</label>
        </div>
        <div className="relative">
            {children}
            {readOnly && (
                <div className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none">
                    <Shield size={16} className="opacity-20 text-secondary" />
                </div>
            )}
        </div>
    </div>
);

const UpdateDonationRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [request, setRequest] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [reqRes, distRes, upzRes] = await Promise.all([
                    axiosSecure.get(`/donation-request/${id}`),
                    fetch('/District.json').then(res => res.json()),
                    fetch('/Upozila.json').then(res => res.json())
                ]);
                setRequest(reqRes.data);
                setDistricts(distRes);
                setUpazilas(upzRes);
                setLoading(false);
            } catch (error) {
                console.error("DATA_FETCH_FAILURE", error);
                setLoading(false);
            }
        };
        loadData();
    }, [id, axiosSecure]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const updatedInfo = {
            recipientName: form.recipientName.value,
            recipientDistrict: form.district.value,
            recipientUpazila: form.upazila.value,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            bloodGroup: form.bloodGroup.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            requestMessage: form.requestMessage.value,
        };

        try {
            const res = await axiosSecure.patch(`/update-donation-request/${id}`, updatedInfo);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "LOGS_UPDATED",
                    text: "Mission parameters re-calibrated successfully.",
                    icon: "success",
                    background: "#1a1a1a",
                    color: "#fff",
                    confirmButtonColor: "#ef4444"
                });
                navigate('/dashboard/my-donation-requests');
            }
        } catch (error) {
            Swal.fire("CRITICAL_ERROR", "Patch protocol failed.", "error");
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center font-mono">
            <span className="animate-pulse text-xl tracking-widest uppercase opacity-50 text-secondary">Loading_Mission_Files...</span>
        </div>
    );

    const inputClasses = "w-full bg-base-200 border-2 border-base-content/10 px-4 py-4 text-sm md:text-base font-bold tracking-widest focus:border-secondary outline-none transition-all uppercase";
    const readOnlyClasses = "w-full bg-base-300 border-2 border-base-content/5 px-4 py-4 text-sm md:text-base font-bold tracking-widest opacity-50 cursor-not-allowed uppercase";

    return (
        <div className="min-h-screen bg-base-100 p-4 md:p-8 lg:p-12 font-mono">
            <div className="w-full border-2 border-base-content/10 bg-base-200/20 relative overflow-hidden shadow-2xl">
                
                {/* Header Decoration */}
                <header className="p-8 md:p-12 border-b-2 border-base-content/10 bg-black/40 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 text-secondary mb-2">
                            <Activity size={20} className="animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-[0.4em]">Protocol_ID: {id?.slice(-8)}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">Re-calibrate_Mission</h1>
                    </div>
                    <div className="px-6 py-2 border-2 border-secondary/30 text-secondary text-[10px] font-black uppercase tracking-widest">
                        Status: Revision_Mode
                    </div>
                </header>

                <form onSubmit={handleUpdate} className="p-6 md:p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Section 1: Origin Data */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-[2px] w-12 bg-secondary" />
                            <h3 className="text-sm font-black uppercase tracking-[0.4em] opacity-40">Section_01: Requester_Origin</h3>
                        </div>
                        
                        <TacticalField label="Requester_Name" icon={User} readOnly>
                            <input type="text" value={request.requesterName} readOnly className={readOnlyClasses} />
                        </TacticalField>

                        <TacticalField label="Secure_Comm_Email" icon={Mail} readOnly>
                            <input type="text" value={request.requesterEmail} readOnly className={readOnlyClasses} />
                        </TacticalField>
                    </div>

                    {/* Section 2: Mission Parameters */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-[2px] w-12 bg-secondary" />
                            <h3 className="text-sm font-black uppercase tracking-[0.4em] opacity-40">Section_02: Core_Parameters</h3>
                        </div>

                        <TacticalField label="Target_Recipient" icon={User}>
                            <input type="text" name="recipientName" defaultValue={request.recipientName} required className={inputClasses} />
                        </TacticalField>

                        <TacticalField label="Blood_Classification" icon={Droplet}>
                            <select name="bloodGroup" defaultValue={request.bloodGroup} required className={`${inputClasses} cursor-pointer appearance-none`}>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                                    <option key={group} value={group} className="bg-base-300">{group}</option>
                                ))}
                            </select>
                        </TacticalField>
                    </div>

                    {/* Section 3: Deployment Location */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-[2px] w-12 bg-secondary" />
                            <h3 className="text-sm font-black uppercase tracking-[0.4em] opacity-40">Section_03: Geographic_Deployment</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <TacticalField label="Target_District" icon={MapPin}>
                                <select name="district" defaultValue={request.recipientDistrict} required className={`${inputClasses} cursor-pointer appearance-none`}>
                                    {districts.map(d => <option key={d.id} value={d.name} className="bg-base-300">{d.name}</option>)}
                                </select>
                            </TacticalField>

                            <TacticalField label="Target_Upazila" icon={MapPin}>
                                <select name="upazila" defaultValue={request.recipientUpazila} required className={`${inputClasses} cursor-pointer appearance-none`}>
                                    {upazilas.map(u => <option key={u.id} value={u.name} className="bg-base-300">{u.name}</option>)}
                                </select>
                            </TacticalField>

                            <TacticalField label="Medical_Facility" icon={Hospital}>
                                <input type="text" name="hospitalName" defaultValue={request.hospitalName} required className={inputClasses} />
                            </TacticalField>

                            <TacticalField label="Coordinates_Full_Address" icon={MapPin}>
                                <input type="text" name="fullAddress" defaultValue={request.fullAddress} required className={inputClasses} />
                            </TacticalField>
                        </div>
                    </div>

                    {/* Section 4: Temporal Logistics */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
                        <TacticalField label="Deployment_Date" icon={Calendar}>
                            <input type="date" name="donationDate" defaultValue={request.donationDate} required className={inputClasses} />
                        </TacticalField>

                        <TacticalField label="Deployment_Time" icon={Clock}>
                            <input type="time" name="donationTime" defaultValue={request.donationTime} required className={inputClasses} />
                        </TacticalField>
                    </div>

                    {/* Section 5: Mission Intelligence */}
                    <div className="lg:col-span-2">
                        <TacticalField label="Intelligence_Brief_Message" icon={MessageSquare}>
                            <textarea name="requestMessage" defaultValue={request.requestMessage} required className={`${inputClasses} h-32 py-4 resize-none`}></textarea>
                        </TacticalField>
                    </div>

                    {/* Action Footer */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="lg:col-span-2 mt-6 pt-10 border-t-2 border-base-content/10"
                    >
                        <button type="submit" className="w-full bg-secondary text-white py-6 text-sm md:text-base font-black uppercase tracking-[0.5em] flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 shadow-2xl border-b-4 border-red-800 transition-all">
                            <Save size={24} /> Commit_Parameter_Re-calibration
                        </button>
                    </motion.div>
                </form>

                {/* System Status Line */}
                <footer className="bg-black/60 p-4 text-[10px] font-black opacity-30 uppercase tracking-[0.3em] flex justify-between">
                    <span>Sys_Ver: 2.0.4-LATEST</span>
                    <span className="text-secondary animate-pulse">Syncing_with_Central_Node...</span>
                </footer>
            </div>
        </div>
    );
};

export default UpdateDonationRequest;