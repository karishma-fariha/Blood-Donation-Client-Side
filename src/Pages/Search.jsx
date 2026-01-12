import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Droplets, MapPin, Database, Activity, User, Mail, Hash } from 'lucide-react';

const Search = () => {
    const [donors, setDonors] = useState([]);
    const [searching, setSearching] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    useEffect(() => {
        axios.get('/District.json').then(res => setDistricts(res.data));
        axios.get('/Upozila.json').then(res => setUpazilas(res.data));
    }, []);

    const handleDistrictChange = (e) => {
        const selectedDistrictName = e.target.value;
        const district = districts.find(d => d.name === selectedDistrictName);
        if (district) {
            const filtered = upazilas.filter(u => u.district_id === district.id);
            setFilteredUpazilas(filtered);
        } else {
            setFilteredUpazilas([]);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearching(true);
        const form = e.target;
        const bloodGroup = form.bloodGroup.value;
        const district = form.district.value;
        const upazila = form.upazila.value;

        try {
            const res = await axios.get(`https://blood-donation-server-side-ten.vercel.app/donor-search?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`);
            setDonors(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setSearching(false);
        }
    };

    // SHARED INDUSTRIAL STYLES
    const inputStyle = "w-full bg-base-100 border border-base-content/20 px-4 py-2 text-xs focus:border-secondary focus:outline-none transition-all font-mono uppercase tracking-tighter";
    const labelStyle = "text-[9px] font-black uppercase tracking-[0.2em] text-secondary mb-1 flex items-center gap-2";

    return (
        <div className="max-w-7xl my-20 mx-auto p-6 min-h-screen  font-mono text-base-content">
            
            {/* 1. TERMINAL HEADER */}
            <div className="mb-10 flex flex-col items-center">
                <div className="flex items-center gap-3 mb-2">
                    <Database className="text-secondary animate-pulse" size={20} />
                    <h2 className="text-2xl font-black tracking-[0.3em] uppercase">Registry_Scanner</h2>
                </div>
                <div className="h-0.5 w-48 bg-linear-to-r from-transparent via-secondary to-transparent"></div>
                <p className="text-[10px] mt-2 opacity-50 uppercase tracking-widest font-bold">Querying: Global_Donor_Network v2.0</p>
            </div>

            {/* 2. SEARCH CONTROL PANEL */}
            <div className="relative group mb-12">
                {/* Decorative Brackets */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-secondary/30"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-secondary/30"></div>

                <div className="bg-base-200/50 backdrop-blur-md border border-base-content/10 p-6">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <div>
                            <label className={labelStyle}><Droplets size={12}/> [01] Group_Type</label>
                            <select name="bloodGroup" className={inputStyle} required>
                                <option value="">Select_Type</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className={labelStyle}><MapPin size={12}/> [02] Zone_District</label>
                            <select name="district" className={inputStyle} onChange={handleDistrictChange} required>
                                <option value="">Select_District</option>
                                {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className={labelStyle}><MapPin size={12}/> [03] Zone_Upazila</label>
                            <select name="upazila" className={inputStyle} required disabled={filteredUpazilas.length === 0}>
                                <option value="">Select_Upazila</option>
                                {filteredUpazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                            </select>
                        </div>

                        <button 
                            type="submit" 
                            disabled={searching}
                            className="bg-secondary text-white h-[38px] font-black uppercase tracking-widest text-[10px] hover:bg-red-800 transition-all flex items-center justify-center gap-2"
                        >
                            {searching ? "SCANNING..." : <><SearchIcon size={14}/> EXECUTE_QUERY</>}
                        </button>
                    </form>
                </div>
            </div>

            {/* 3. RESULTS AREA */}
            <div className="relative">
                {searching ? (
                    <div className="flex flex-col items-center py-20">
                        <Activity className="text-secondary animate-bounce mb-4" size={40} />
                        <p className="text-xs font-black uppercase tracking-[0.5em] animate-pulse">Syncing_Records...</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {donors.length > 0 ? (
                                donors.map((donor, idx) => (
                                    <motion.div 
                                        key={donor._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="bg-base-100 border border-base-content/10 p-5 group hover:border-secondary/50 transition-all relative overflow-hidden"
                                    >
                                        {/* Corner Label */}
                                        <div className="absolute top-0 right-0 bg-secondary/10 px-2 py-1 border-bl border-base-content/10">
                                            <span className="text-[9px] font-black text-secondary">ID:{donor._id.slice(-6).toUpperCase()}</span>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-secondary text-white flex items-center justify-center font-black text-xl border-b-4 border-black/20">
                                                {donor.bloodGroup}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-black uppercase tracking-tighter leading-none mb-1 group-hover:text-secondary transition-colors">
                                                    {donor.name}
                                                </h3>
                                                <p className="text-[10px] opacity-60 flex items-center gap-1 uppercase">
                                                    <MapPin size={10}/> {donor.district}, {donor.upazila}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-dashed border-base-content/10 space-y-2">
                                            <div className="flex justify-between items-center text-[10px]">
                                                <span className="opacity-40 uppercase font-bold">Contact_Ref:</span>
                                                <span className="font-black text-secondary lowercase">{donor.email}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px]">
                                                <span className="opacity-40 uppercase font-bold">Status:</span>
                                                <span className="flex items-center gap-1 text-green-500 font-black tracking-widest">
                                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                                    AVAILABLE
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-32 flex flex-col items-center border-2 border-dashed border-base-content/5">
                                    <Hash size={40} className="opacity-10 mb-4" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">ERR: DATA_RECORD_NOT_FOUND</p>
                                    <p className="text-[8px] opacity-20 mt-1 uppercase">Modify query parameters and re-execute scan.</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

export default Search;