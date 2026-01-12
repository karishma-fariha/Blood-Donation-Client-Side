import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { User, Shield, MapPin, Droplet, Edit3, Save, X, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

// ✅ 1. DECLARE SUB-COMPONENTS OUTSIDE THE MAIN COMPONENT
const TacticalInput = ({ label, icon: Icon, value, onChange, type = "text", disabled = false, options = null }) => (
    <div className="relative group w-full">
        <div className="flex items-center gap-2 mb-3 opacity-60 group-focus-within:opacity-100 transition-opacity">
            <Icon size={18} className="text-secondary" />
            <label className="text-xs md:text-sm font-black uppercase tracking-widest">{label}</label>
        </div>
        {options ? (
            <select
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="w-full bg-base-200 border-2 border-base-content/10 px-4 py-4 text-sm md:text-base font-bold uppercase tracking-widest focus:border-secondary outline-none appearance-none disabled:opacity-40 transition-all cursor-pointer"
            >
                {options.map(opt => <option key={opt} value={opt} className="bg-base-300">{opt}</option>)}
            </select>
        ) : (
            <input
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="w-full bg-base-200 border-2 border-base-content/10 px-4 py-4 text-sm md:text-base font-bold tracking-widest focus:border-secondary outline-none disabled:opacity-40 transition-all"
            />
        )}
        {disabled && <div className="absolute top-[45px] right-4"><Shield size={16} className="opacity-20" /></div>}
    </div>
);

const MyProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [isEditable, setIsEditable] = useState(false);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        bloodGroup: "",
        district: "",
        upazila: "",
        avatar: ""
    });

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/${user.email}`)
                .then(res => {
                    setFormData({
                        name: res.data.name || user.displayName || "",
                        email: res.data.email || user.email || "",
                        bloodGroup: res.data.bloodGroup || "",
                        district: res.data.district || "",
                        upazila: res.data.upazila || "",
                        avatar: res.data.avatar || user.photoURL || ""
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.error("SYNC_ERROR:", err);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(user, {
                displayName: formData.name,
                photoURL: formData.avatar,
            });
            const response = await axiosSecure.patch(`/users/${user.email}`, formData);

            if (response.data.modifiedCount > 0 || response.data.upsertedCount > 0) {
                toast.success("PROFILE_UPDATED");
                setIsEditable(false);
            }
        } catch (error) {
            toast.error("UPDATE_PROTOCOL_FAILURE");
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center font-mono">
            <span className="animate-pulse text-xl tracking-widest uppercase opacity-50">Syncing_Bio_Data...</span>
        </div>
    );

    return (
        <div className="bg-base-100 font-mono">
            <div className="w-full border-2 border-base-content/10 bg-base-200/20 relative overflow-hidden shadow-2xl">
                
                {/* Header Section */}
                <header className="p-6 md:p-10 border-b-2 border-base-content/10 flex flex-col lg:flex-row justify-between items-center gap-8 bg-black/40">
                    <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        <div className="relative">
                            <div className="w-32 h-32 md:w-40 md:h-40 border-4 border-secondary p-1">
                                <img 
                                    src={formData.avatar} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-black text-secondary uppercase tracking-[0.3em] mb-2">Authenticated_Donor_Registry</p>
                            <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">{formData.name || "UNNAMED_HERO"}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 opacity-50 text-[10px] md:text-xs font-bold">
                                <span className="flex items-center gap-2 border border-base-content/20 px-2 py-1"><Activity size={14} /> SYSTEM: NOMINAL</span>
                                <span className="flex items-center gap-2 border border-base-content/20 px-2 py-1"><Shield size={14} /> ENCRYPTION: ACTIVE</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full lg:w-auto gap-4">
                        {!isEditable ? (
                            <button 
                                onClick={() => setIsEditable(true)} 
                                className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-white text-xs md:text-sm font-black uppercase tracking-widest hover:bg-secondary/80 transition-all italic"
                            >
                                <Edit3 size={18} /> Modify_Registry
                            </button>
                        ) : (
                            <button 
                                onClick={() => setIsEditable(false)} 
                                className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 border-2 border-red-500 text-red-500 text-xs md:text-sm font-black uppercase tracking-widest hover:bg-red-500/10 transition-all"
                            >
                                <X size={18} /> Abort_Sync
                            </button>
                        )}
                    </div>
                </header>

                {/* Form Body */}
                <form onSubmit={handleSave} className="p-6 md:p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                    
                    <div className="space-y-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-[2px] w-12 bg-secondary" />
                            <h3 className="text-sm font-black uppercase tracking-[0.4em] opacity-40">Section_01: Identity</h3>
                        </div>
                        <TacticalInput label="Full_Name" icon={User} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} disabled={!isEditable} />
                        <TacticalInput label="Secure_Email" icon={Shield} value={formData.email} disabled={true} />
                        <TacticalInput label="Profile_Asset_URL" icon={Activity} value={formData.avatar} onChange={(e) => setFormData({...formData, avatar: e.target.value})} disabled={!isEditable} />
                    </div>

                    <div className="space-y-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-[2px] w-12 bg-secondary" />
                            <h3 className="text-sm font-black uppercase tracking-[0.4em] opacity-40">Section_02: Bio_Loc</h3>
                        </div>
                        <TacticalInput 
                            label="Blood_Classification" 
                            icon={Droplet} 
                            value={formData.bloodGroup} 
                            onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})} 
                            disabled={!isEditable} 
                            options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} 
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <TacticalInput label="Region_District" icon={MapPin} value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} disabled={!isEditable} />
                            <TacticalInput label="Local_Upazila" icon={MapPin} value={formData.upazila} onChange={(e) => setFormData({...formData, upazila: e.target.value})} disabled={!isEditable} />
                        </div>
                    </div>

                    {isEditable && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-2 mt-4">
                            <button type="submit" className="w-full bg-secondary text-white py-6 text-sm md:text-base font-black uppercase tracking-[0.5em] flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 shadow-xl border-b-4 border-red-800">
                                <Save size={24} /> Commit_Changes_To_Mainframe
                            </button>
                        </motion.div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default MyProfile;