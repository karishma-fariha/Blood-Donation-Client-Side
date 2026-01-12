import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../Provider/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { UserPlus, Fingerprint, MapPin, Droplets, Mail, Key, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

const Register = () => {
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [allUpazilas, setAllUpazilas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedUpazila, setSelectedUpazila] = useState("");
    const [loading, setLoading] = useState(false);

    const { createUser, updateUser, googleLogin } = use(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/District.json').then(res => setDistricts(res.data));
        axios.get('/Upozila.json').then(res => setAllUpazilas(res.data));
    }, []);

    const filteredUpazilas = allUpazilas.filter(u => {
        const districtObj = districts.find(d => d.name === selectedDistrict);
        return districtObj ? u.district_id === districtObj.id : false;
    });

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedUpazila("");
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const name = form.name.value;
        const file = form.photo.files[0];
        const email = form.email.value;
        const bloodGroup = form.bloodGroup.value;
        const password = form.password.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setLoading(false);
            return setError("ERR: PASS_WEAK_COMPLEXITY");
        }

        try {
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=da8663caf60ec5654ff6eca5850ac8e5`, 
                { image: file }, { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            const mainPhotoUrl = res.data.data.display_url;
            const formData = {
                name, email, avatar: mainPhotoUrl, bloodGroup,
                district: selectedDistrict, upazila: selectedUpazila,
                role: "donor", status: "active"
            };

            await createUser(email, password);
            await updateUser({ displayName: name, photoURL: mainPhotoUrl });
            await axios.post('https://blood-donation-server-side-ten.vercel.app/users', formData);
            
            toast.success("SYSTEM_STATUS: USER_SYNC_COMPLETE");
            navigate('/');
        } catch (err) {
            toast.error("AUTH_ERR: REGISTRATION_FAILED");
        } finally {
            setLoading(false);
        }
    };

    // SHARED STYLING CONSTANTS
    const inputStyle = "w-full bg-base-100 border border-base-content/20 px-4 py-2 text-sm focus:border-secondary focus:outline-none transition-all font-mono tracking-tighter placeholder:opacity-20";
    const labelStyle = "text-[10px] font-black tracking-[0.2em] text-secondary mb-1 flex items-center gap-2";

    return (
        <div className="w-full max-w-2xl">
            {/* 1. Terminal Header Tab */}
            <div className="bg-secondary px-4 py-2 flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-3 text-white">
                    <UserPlus size={14} />
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase">Protocol: Enrollment_v2.0</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-white/20"></div>
                    <div className="w-2 h-2 bg-white/40"></div>
                </div>
            </div>

            {/* 2. Form Body */}
            <div className="bg-base-100 border-x border-b border-base-content/10 p-6 md:p-8 shadow-2xl">
                <form onSubmit={handleRegister} className="space-y-6">
                    
                    {/* Data Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        
                        {/* Section A: Bio-Data */}
                        <div className="space-y-4">
                            <div>
                                <label className={labelStyle}><Fingerprint size={12}/> [01] Full_Name</label>
                                <input type="text" name="name" className={inputStyle} placeholder="Operator_ID" required />
                            </div>

                            <div>
                                <label className={labelStyle}><Droplets size={12}/> [02] Blood_Group</label>
                                <select name='bloodGroup' className={inputStyle} required>
                                    <option value="">Select_Type</option>
                                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className={labelStyle}><MapPin size={12}/> [03] District</label>
                                <select value={selectedDistrict} onChange={handleDistrictChange} className={inputStyle} required>
                                    <option value="">Loc_District</option>
                                    {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className={labelStyle}><MapPin size={12}/> [04] Upazila</label>
                                <select value={selectedUpazila} onChange={(e) => setSelectedUpazila(e.target.value)} className={inputStyle} disabled={!selectedDistrict} required>
                                    <option value="">Loc_Upazila</option>
                                    {filteredUpazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Section B: Access-Data */}
                        <div className="space-y-4">
                            <div>
                                <label className={labelStyle}><Mail size={12}/> [05] System_Email</label>
                                <input type="email" name="email" className={inputStyle} placeholder="Email_Address" required />
                            </div>

                            <div>
                                <label className={labelStyle}><ImageIcon size={12}/> [06] Identification_Photo</label>
                                <input type="file" name="photo" className={`${inputStyle} file:hidden pt-1.5 cursor-pointer h-9.5`} required />
                            </div>

                            <div className="relative">
                                <label className={labelStyle}><Key size={12}/> [07] Access_Key</label>
                                <input 
                                    type={show ? 'text' : 'password'} 
                                    name='password' 
                                    className={inputStyle} 
                                    placeholder="••••••••" 
                                    required 
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShow(!show)} 
                                    className='absolute bottom-2.5 right-3 text-base-content/30 hover:text-secondary'
                                >
                                    {show ? <FaEyeSlash size={14}/> : <FaEye size={14} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="border-l-2 border-secondary bg-secondary/5 px-3 py-1 mt-2">
                            <span className="text-[9px] font-black text-secondary tracking-widest">{error}</span>
                        </div>
                    )}

                    {/* 3. Action Terminal */}
                    <div className="pt-6 border-t border-base-content/10 space-y-3">
                        <button 
                            type='submit' 
                            disabled={loading}
                            className="w-full bg-secondary text-white py-3 font-black tracking-[0.4em] text-[10px] hover:bg-red-800 transition-all flex justify-center items-center"
                        >
                            {loading ? "DATA_TRANSFER_IN_PROGRESS..." : "Execute_Registration"}
                        </button>

                        <div className="grid grid-cols-2 gap-3">
                            <button 
                                type="button"
                                onClick={googleLogin} 
                                className="border border-base-content/20 py-2.5 text-[9px] font-black uppercase tracking-widest hover:bg-base-200 flex items-center justify-center gap-2"
                            >
                                <FcGoogle size={16} /> Google_Link
                            </button>
                            <Link 
                                to="/login" 
                                className="border border-secondary/40 text-secondary py-2.5 text-[9px] font-black uppercase tracking-widest hover:bg-secondary hover:text-white transition-all text-center"
                            >
                                Return_to_Portal
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;