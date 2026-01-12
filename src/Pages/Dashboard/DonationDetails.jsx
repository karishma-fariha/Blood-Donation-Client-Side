import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { 
    Activity, MapPin, Hospital, Clock, 
    Calendar, MessageSquare, User, ShieldCheck, 
    AlertCircle, ChevronRight, Droplets 
} from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const DonationDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [request, setRequest] = useState(null);

    useEffect(() => {
        axiosSecure.get(`/donation-request/${id}`)
            .then(res => setRequest(res.data));
    }, [id, axiosSecure]);

    const handleConfirmDonation = async (e) => {
        e.preventDefault();
        const donorInfo = {
            donorName: user?.displayName,
            donorEmail: user?.email,
            status: 'inprogress'
        };

        try {
            const res = await axiosSecure.patch(`/donation-requests/donate/${id}`, donorInfo);
            if (res.data.modifiedCount > 0) {
                document.getElementById('donate_modal').close();
                setRequest({
                    ...request,
                    status: 'inprogress',
                    donorName: user?.displayName,
                    donorEmail: user?.email
                });
                Swal.fire({
                    title: "PROTOCOL_CONFIRMED",
                    text: "You have been assigned as the primary donor asset.",
                    icon: "success",
                    background: '#1a1a1a',
                    color: '#fff',
                    confirmButtonColor: '#ef4444'
                });
            }
        } catch (error) {
            Swal.fire("SYNC_ERROR", "Could not commit to protocol.", "error");
        }
    };

    if (!request) return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <Activity className="animate-spin text-secondary" size={48} />
        </div>
    );

    const isOwner = user?.email === request.requesterEmail;

    return (
        <div className="min-h-screen bg-base-100 p-4 md:p-8 lg:p-12 font-mono selection:bg-secondary selection:text-white my-10">
            
            {/* --- TERMINAL HEADER --- */}
            <header className="max-w-5xl mx-auto mb-10 border-b-2 border-base-content/10 pb-6">
                <div className="flex items-center gap-3 text-secondary mb-2">
                    <Activity size={20} className="animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-[0.4em]">Intel: Mission_Profile_ID_{id?.slice(-6)}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter flex items-center gap-4">
                    Request_Specs <ChevronRight size={40} className="text-secondary" />
                </h1>
            </header>

            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-5xl mx-auto"
            >
                <div className="bg-base-200/30 border-2 border-base-content/10 relative overflow-hidden">
                    {/* Decorative Scanner Line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-secondary/20 animate-scan pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-base-content/10">
                        
                        {/* LEFT COLUMN: SUBJECT DATA */}
                        <div className="p-6 md:p-10 space-y-8">
                            <section>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-6 flex items-center gap-2">
                                    <User size={12}/> Recipient_Intel
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-secondary block mb-1">[FULL_NAME]</label>
                                        <p className="text-xl font-bold uppercase">{request.recipientName}</p>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-secondary block mb-1">[BLOOD_CLASSIFICATION]</label>
                                        <div className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-1 font-black italic">
                                            <Droplets size={16} />
                                            {request.bloodGroup}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-secondary block mb-1">[MISSION_URGENCY]</label>
                                        <p className="text-sm italic opacity-70 border-l-2 border-secondary pl-4 py-2 bg-secondary/5">
                                            "{request.requestMessage}"
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* RIGHT COLUMN: LOGISTICS */}
                        <div className="p-6 md:p-10 space-y-8 bg-base-content/2">
                            <section>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-6 flex items-center gap-2">
                                    <MapPin size={12}/> Deployment_Site
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4 items-start">
                                        <Hospital className="text-secondary shrink-0" size={20} />
                                        <div>
                                            <label className="text-[10px] font-black uppercase opacity-40 block">[FACILITY]</label>
                                            <p className="font-bold uppercase leading-tight">{request.hospitalName}</p>
                                            <p className="text-xs opacity-60 mt-1">{request.fullAddress}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <MapPin className="text-secondary shrink-0" size={20} />
                                        <div>
                                            <label className="text-[10px] font-black uppercase opacity-40 block">[REGION]</label>
                                            <p className="font-bold uppercase tracking-widest text-sm">{request.recipientDistrict}, {request.recipientUpazila}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 border-t-2 border-base-content/5 pt-4">
                                        <div className="flex gap-2 items-center">
                                            <Calendar size={14} className="opacity-40" />
                                            <span className="text-xs font-bold">{request.donationDate}</span>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <Clock size={14} className="opacity-40" />
                                            <span className="text-xs font-bold">{request.donationTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* DYNAMIC FOOTER: ASSIGNMENT STATUS */}
                    <div className="p-6 md:p-10 border-t-2 border-base-content/10 bg-base-content/3">
                        {request.status === 'inprogress' ? (
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-blue-500/30 p-6 bg-blue-500/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-500 flex items-center justify-center text-white shrink-0">
                                        <ShieldCheck size={28} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-tighter text-blue-500">[ASSET_LOCKED_IN_PROGRESS]</p>
                                        <p className="font-bold uppercase text-lg">{request.donorName}</p>
                                        <p className="text-xs opacity-50">{request.donorEmail}</p>
                                    </div>
                                </div>
                                <div className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-3 py-1 border border-blue-500/50 uppercase italic">
                                    Primary_Donor_Confirmed
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex-1">
                                    {request.status === 'pending' ? (
                                        <div className="flex items-center gap-3 text-secondary">
                                            <AlertCircle size={20} className="animate-pulse" />
                                            <span className="text-xs font-black uppercase tracking-widest">Status: Ready_For_Deployment</span>
                                        </div>
                                    ) : (
                                        <div className="inline-block px-4 py-2 border-2 border-green-500 text-green-500 text-xs font-black uppercase italic">
                                            Mission_Status: {request.status}
                                        </div>
                                    )}
                                </div>

                                <div className="w-full md:w-auto">
                                    {request.status === 'pending' ? (
                                        user ? (
                                            !isOwner ? (
                                                <button
                                                    className="group relative overflow-hidden bg-secondary text-white px-12 py-4 font-black uppercase tracking-[0.2em] text-sm hover:invert transition-all w-full md:w-auto"
                                                    onClick={() => document.getElementById('donate_modal').showModal()}
                                                >
                                                    Confirm_Donation
                                                </button>
                                            ) : (
                                                <span className="text-[10px] font-black uppercase opacity-40 flex items-center gap-2 italic">
                                                    <AlertCircle size={14}/> Self_Donation_Protocol_Restricted
                                                </span>
                                            )
                                        ) : (
                                            <p className="text-xs font-black uppercase opacity-40">User_Auth_Required_To_Commit</p>
                                        )
                                    ) : null}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* MODAL: TACTICAL OVERRIDE */}
                <dialog id="donate_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-md">
                    <div className="modal-box rounded-none border-4 border-secondary p-0 bg-base-100 max-w-md">
                        <div className="bg-secondary p-4 text-white flex items-center justify-between">
                            <h3 className="font-black italic uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck size={20} /> Deployment_Confirm
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-xs font-bold leading-relaxed">
                                YOU ARE ABOUT TO COMMIT AS A PRIMARY DONOR FOR <span className="text-secondary font-black underline">{request.recipientName}</span>. 
                                THIS ACTION WILL LOCK THE MISSION PROFILE. ENSURE YOUR AVAILABILITY AT THE SPECIFIED LOGISTICS.
                            </p>
                            
                            <form onSubmit={handleConfirmDonation} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase opacity-40">[ASSET_NAME]</label>
                                    <input type="text" value={user?.displayName} readOnly className="w-full bg-base-200 p-3 text-sm font-bold uppercase outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase opacity-40">[ASSET_EMAIL]</label>
                                    <input type="text" value={user?.email} readOnly className="w-full bg-base-200 p-3 text-sm font-bold outline-none" />
                                </div>
                                <div className="flex gap-2 pt-4">
                                    <button type="submit" className="flex-1 bg-secondary text-white py-4 font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-colors">
                                        Confirm_Deployment
                                    </button>
                                    <button type="button" onClick={() => document.getElementById('donate_modal').close()} className="px-6 py-4 border-2 border-base-content/10 font-black uppercase text-xs hover:bg-base-200 transition-colors">
                                        Abort
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </motion.div>
        </div>
    );
};

export default DonationDetails;