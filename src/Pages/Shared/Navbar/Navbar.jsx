import React, { useState, useEffect, use } from 'react';
import { Link, NavLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, LayoutDashboard, Menu, X, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';

import Logo from '../../../Components/Logo/Logo';
import ThemeToggle from '../../../Components/ThemeToggle';
import { AuthContext } from '../../../Provider/AuthContext';

const Navbar = () => {
    const { user, logout } = use(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout().then(() => {
            toast.success('Logged out successfully');
        }).catch((error) => {
            toast.error(error.message);
        });
    };

    const navLinks = [
        { name: '_Central_Hub', path: '/' },
        { name: '_Donor_Registry', path: '/search' },
        { name: '_Supply_Vault', path: '/inventory' },
        { name: '_Field_Ops', path: '/field-op' },
        { name: '_System_Specs', path: '/system-specs' },
    ];

    const navTextColor = "text-secondary hover:text-red-800"; 

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 w-full z-100 transition-all duration-300 ${
                    isScrolled 
                    ? 'py-3 bg-base-100/90 backdrop-blur-md shadow-lg border-b border-base-content/10' 
                    : 'py-5 bg-base-100/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none'
                }`}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    
                    <div className="flex items-center gap-2">
                        <Link to="/" className="hover:scale-105 transition-transform">
                            <Logo isScrolled={isScrolled} />
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => `
                                    relative text-sm font-black tracking-widest transition-colors font-mono
                                    ${isActive ? 'text-red-800' : 'text-secondary'}
                                    hover:text-red-800
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.name}
                                        {isActive && (
                                            <motion.div 
                                                layoutId="navUnderline"
                                                className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-800"
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Action Area */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        {user ? (
                            <div className="dropdown dropdown-end">
                                <motion.div 
                                    whileTap={{ scale: 0.95 }}
                                    tabIndex={0} 
                                    role="button" 
                                    className="avatar online cursor-pointer"
                                >
                                    <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                        <img src={user?.photoURL} alt="User" />
                                    </div>
                                </motion.div>
                                <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow-2xl bg-base-100 rounded-xl w-52 mt-4 border border-base-content/10 font-mono">
                                    <li className="menu-title text-xs opacity-50 uppercase tracking-tighter">_Terminal_User</li>
                                    <li><Link to="/dashboard"><LayoutDashboard size={16}/> _Dashboard</Link></li>
                                    <div className="divider my-0 opacity-10"></div>
                                    <li><button onClick={handleLogout} className="text-error font-bold tracking-widest uppercase text-[10px]"><LogOut size={16}/> Terminate_Sync</button></li>
                                </ul>
                            </div>
                        ) : (
                            <div className="hidden md:flex gap-3 font-mono">
                                <Link 
                                    to="/login" 
                                    className="btn btn-outline btn-secondary hover:bg-red-800 hover:border-red-800 border-2 btn-sm font-black transition-all text-[10px] uppercase tracking-widest"
                                >
                                    [ACCESS_PORTAL]
                                </Link>
                                <Link to="/register" className="btn btn-secondary btn-sm px-6 shadow-md shadow-secondary/20 font-black text-[10px] uppercase tracking-widest hover:bg-red-800 border-none">
                                    [INITIALIZE_SYNC]
                                </Link>
                            </div>
                        )}

                        <button 
                            className={`lg:hidden p-2 transition-colors ${navTextColor}`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Sidebar & Backdrop */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] lg:hidden"
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 w-72 h-screen bg-white shadow-2xl z-120 p-6 lg:hidden font-mono border-l-4 border-secondary flex flex-col"
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex justify-between items-center pb-6 border-b border-base-content/10">
                                    <span className="text-[10px] text-secondary font-black uppercase tracking-[0.3em]">_Menu_Index</span>
                                    <button onClick={() => setMobileMenuOpen(false)} className="text-secondary"><X size={24}/></button>
                                </div>

                                <div className="flex flex-col gap-6 mt-8 overflow-y-auto grow">
                                    {navLinks.map((link) => (
                                        <NavLink 
                                            key={link.path} 
                                            to={link.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={({ isActive }) => `
                                                text-sm font-black uppercase flex items-center justify-between group tracking-widest transition-colors
                                                ${isActive ? 'text-red-800' : 'text-secondary hover:text-red-800'}
                                            `}
                                        >
                                            {/* FIX: Use a function here to access isActive properly */}
                                            {({ isActive }) => (
                                                <>
                                                    {link.name} 
                                                    <ChevronRight size={16} className={`${isActive ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity text-red-800`}/>
                                                </>
                                            )}
                                        </NavLink>
                                    ))}
                                </div>

                                {!user && (
                                    <div className="mt-auto pt-6 border-t border-base-content/10 space-y-3">
                                        <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline btn-secondary w-full hover:bg-red-800 hover:border-red-800 btn-sm uppercase text-[10px] tracking-widest font-black">Portal_Access</Link>
                                        <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary w-full hover:bg-red-800 btn-sm uppercase text-[10px] tracking-widest font-black">Initialize_Sync</Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;