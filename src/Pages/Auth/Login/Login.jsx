import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { ShieldCheck, Fingerprint, LogIn, AlertCircle } from 'lucide-react';
import { AuthContext } from '../../../Provider/AuthContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const { login, googleLogin, setEmailForReset } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleForgetPassword = () => {
        setEmailForReset(email);
        navigate("/auth/forget-password");
    }

    const handleGoogleSignIn = () => {
        googleLogin()
            .then(() => navigate(location?.state || '/'))
            .catch(error => console.log(error));
    }

    const handleTogglePasswordShow = (e) => {
        e.preventDefault();
        setShowPass(!showPass);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        
        login(email, password)
            .then(() => navigate(`${location.state ? location.state : "/"}`))
            .catch((error) => {
                const errorCode = error.code;
                setError(errorCode);
                toast.error(errorCode);
            });
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto font-mono"
        >
            <div className="bg-base-200/50 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
                {/* Top Industrial Header */}
                <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
                <div className="p-1 bg-secondary/10 flex justify-between px-4 items-center">
                    <span className="text-[9px] font-black text-secondary tracking-[0.3em] uppercase">_Auth_Protocol_v2.0</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-white/20"></div>
                    </div>
                </div>

                <div className="p-8 md:p-10">
                    <div className="mb-8 text-center">
                        <div className="inline-flex p-3 rounded-full bg-secondary/10 text-secondary mb-4">
                            <ShieldCheck size={32} />
                        </div>
                        <h1 className='font-black text-2xl uppercase tracking-tighter text-primary italic'>
                            [ACCESS_PORTAL]
                        </h1>
                        <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-2">Identify yourself to proceed</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                                <Fingerprint size={12} /> _User_Identifier
                            </label>
                            <input 
                                type="email"
                                placeholder="name@lifeflow.sys"
                                className="w-full bg-black/20 border border-white/10 p-3 rounded-none focus:border-secondary focus:outline-none transition-all text-primary placeholder:text-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name='email' 
                                required 
                            />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                                <LogIn size={12} /> _Security_Key
                            </label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    className="w-full bg-black/20 border border-white/10 p-3 rounded-none focus:border-secondary focus:outline-none transition-all text-primary placeholder:text-white"
                                    placeholder="••••••••"
                                    name='password' 
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={handleTogglePasswordShow}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-secondary'
                                >
                                    {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                            <div className="text-right">
                                <button 
                                    type="button"
                                    onClick={handleForgetPassword} 
                                    className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-secondary hover:underline"
                                >
                                    Recover_Access?
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-secondary/10 border border-secondary/20 flex items-center gap-3 text-secondary text-xs animate-shake">
                                <AlertCircle size={16} />
                                <span className="font-bold uppercase tracking-tight italic">Error: {error}</span>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-4">
                            <button className="w-full bg-secondary hover:bg-secondary/90 text-white font-black py-4 uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 group shadow-lg shadow-secondary/10">
                                [INITIALIZE_LOGIN]
                                <motion.span 
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <LogIn size={16} />
                                </motion.span>
                            </button>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="w-full btn-outline btn
                                 hover:bg-white/5 text-primary/70 hover:text-primary font-black py-4 uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3"
                            >
                                <FcGoogle size={20} />
                                [SYNC_EXTERNAL_AUTH]
                            </button>
                        </div>

                        <p className='text-center text-[11px] font-bold pt-6 text-neutral-500 uppercase tracking-widest'>
                            _New_User_Detected? 
                            <Link className='text-secondary ml-2 hover:underline italic' to="/register">
                                [REGISTER_NODE]
                            </Link>
                        </p>
                    </form>
                </div>
                
                {/* Bottom Metadata */}
                <div className="px-8 pb-4 opacity-20 flex justify-between items-center text-[8px] uppercase tracking-tighter">
                    <span>Enc_v4096</span>
                    <span>System_Status: Stable</span>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;