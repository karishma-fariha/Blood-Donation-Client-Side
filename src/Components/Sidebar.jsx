import React, { useContext, useEffect, useState } from 'react';
import {
    FaUsers, FaHome, FaSignOutAlt, FaThLarge, FaTimes,
    FaUser, FaPlusCircle, FaListAlt, FaBars, FaClipboardList,
    FaUsersCog, FaEdit, FaShieldAlt
} from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Sidebar = () => {
    const axiosSecure = useAxiosSecure();
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [dbUser, setDbUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/${user.email}`)
                .then(res => setDbUser(res.data));
        }
    }, [user, axiosSecure]);

    const handleLogOut = async () => {
        await logOut();
        navigate('/');
    };

    // Organized Navigation Logic
    const navLinks = [
        { path: "/", label: "Main_Home", icon: <FaHome />, end: false },

        // Overview (Role Based)
        {
            path: dbUser?.role === "admin" ? "/dashboard/admin-home" : "/dashboard",
            label: dbUser?.role === "admin" ? "Admin_Overview" : "User_Dashboard",
            icon: <FaThLarge />,
            end: true
        },

        { path: "/dashboard/profile", label: "Profile_Specs", icon: <FaUser />, end: false },

        // Admin Only
        ...(dbUser?.role === "admin" ? [
            { path: "/dashboard/all-users", label: "Registry_Manage", icon: <FaUsersCog />, end: false },
        ] : []),

        // Admin & Volunteer
        ...((dbUser?.role === "admin" || dbUser?.role === "volunteer") ? [
            { path: "/dashboard/all-donation-requests", label: "Global_Missions", icon: <FaClipboardList />, end: false },
            { path: "/dashboard/content-management", label: "Content_Control", icon: <FaEdit />, end: false }
        ] : []),

        // Personal Operations
        { path: "/dashboard/my-donation-requests", label: "My_Operations", icon: <FaListAlt />, end: false },
        { path: "/dashboard/create-donation-request", label: "New_Request", icon: <FaPlusCircle />, end: false },
    ];

    return (
        <>
            {/* MOBILE HEADER - TACTICAL STYLE */}
            <div className="lg:hidden flex items-center justify-between bg-base-300 p-4 border-b border-secondary/30 text-white z-50">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary animate-pulse rounded-full" />
                    <h1 className="text-sm font-black uppercase tracking-tighter">Blood_Net_V2</h1>
                </div>
                <button onClick={toggleSidebar} className="p-2 text-secondary">
                    {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </div>

            {/* MAIN SIDEBAR */}
            <aside className={`
             fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a] text-base-content border-r border-base-content/10
             transform transition-all duration-300 ease-in-out font-mono
             ${isOpen ? "translate-x-0" : "-translate-x-full"} 
             lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen flex flex-col
            `}>

                {/* LOGO / IDENTITY SECTION */}
                <div className="p-8 border-b border-base-content/5 relative">
                    <div className="flex items-center gap-2 text-secondary mb-2">
                        <FaShieldAlt size={12} />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em]">Secure_Interface</span>
                    </div>
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
                        CORE_<span className="text-secondary">LINK</span>
                    </h2>

                    {/* Role Badge */}
                    <div className="mt-4 inline-block px-3 py-1 bg-secondary/10 border border-secondary/20">
                        <p className="text-[10px] font-black text-secondary uppercase tracking-widest">
                            Access: {dbUser?.role || "Fetching..."}
                        </p>
                    </div>
                </div>

                {/* NAVIGATION LINKS */}
                <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-[9px] font-black opacity-20 uppercase tracking-[0.4em] mb-4">Main_Protocols</p>

                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.end}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => `
                                flex items-center gap-4 px-4 py-3 transition-all duration-200 group relative
                                ${isActive
                                    ? "bg-secondary text-white font-black italic shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                                    : "text-base-content/50 hover:text-white hover:bg-base-content/5"
                                }
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && <div className="absolute left-0 top-0 w-1 h-full bg-secondary" />}
                                    <span className={`${isActive ? "text-white" : "text-secondary/50 group-hover:text-secondary"} transition-colors`}>
                                        {link.icon}
                                    </span>
                                    <span className="text-[11px] uppercase tracking-widest">{link.label}</span>
                                    {isActive && <div className="ml-auto w-1 h-1 bg-white rotate-45" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* FOOTER / LOGOUT */}
                <div className="p-6 bg-base-200/20 border-t border-base-content/5">
                    <div className="flex items-center gap-3 px-4 mb-4">
                        <div className="w-8 h-8 bg-base-300 border border-base-content/10 flex items-center justify-center">
                            <FaUser size={14} className="opacity-40" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[10px] font-black uppercase truncate text-white">{dbUser?.name}</p>
                            <p className="text-[8px] font-bold opacity-30 truncate uppercase">{user?.email}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogOut}
                        className="flex items-center gap-4 w-full px-4 py-3 text-[10px] font-black uppercase tracking-widest text-base-content/40 hover:text-secondary hover:bg-secondary/5 transition-all border border-transparent hover:border-secondary/20"
                    >
                        <FaSignOutAlt />
                        <span>Terminate_Session</span>
                    </button>
                </div>
            </aside>

            {/* MOBILE OVERLAY */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default Sidebar;