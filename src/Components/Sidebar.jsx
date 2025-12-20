import React, { useState } from 'react';
import { FaBars, FaHome, FaSignOutAlt, FaThLarge, FaTimes, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle Sidebar for Mobile
    const toggleSidebar = () => setIsOpen(!isOpen);

    const navLinks = [
        {
            path: "/",
            label: "Main Home",
            icon: <FaHome />,
            end: false
        },
        {
            path: "/dashboard",
            label: "Dashboard",
            icon: <FaThLarge />,
            end: true 
        },
        {
            path: "/dashboard/profile",
            label: "My Profile",
            icon: <FaUser />,
            end: false
        },
    ];
    return (
        <div>
            <div className="lg:hidden flex items-center justify-between bg-red-600 p-4 text-white shadow-md">
                <h1 className="text-xl font-bold">Blood Donor</h1>
                <button
                    onClick={toggleSidebar}
                    className="p-2 focus:outline-none hover:bg-red-700 rounded-md transition-colors"
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                lg:translate-x-0 lg:static lg:inset-0 lg:h-screen shadow-xl flex flex-col
            `}>

                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-2xl font-extrabold text-red-500 tracking-tight">
                        Donor Panel
                    </h2>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">
                        Role: Donor
                    </p>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.end}
                            onClick={() => setIsOpen(false)} 
                            className={({ isActive }) => `
                                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                                ${isActive
                                    ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
                                    : "text-gray-400 hover:bg-slate-800 hover:text-white"
                                }
                            `}
                        >
                            <span className="text-lg">{link.icon}</span>
                            <span className="font-medium">{link.label}</span>
                        </NavLink>
                    ))}
                </nav>

                
                <div className="p-4 border-t border-slate-800">
                    <button
                        className="flex items-center gap-4 w-full px-4 py-3 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                        onClick={() => console.log("Logout Logic Here")}
                    >
                        <FaSignOutAlt className="text-lg" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* 3. MOBILE OVERLAY (Dark background when sidebar is open) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>


    );
};

export default Sidebar;