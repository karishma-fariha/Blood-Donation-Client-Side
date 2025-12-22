import React, { useContext, useEffect, useState } from 'react';
import { FaUsers, FaHome, FaSignOutAlt, FaThLarge, FaTimes, FaUser, FaPlus, FaList, FaBars, FaBlog, FaClipboardList, FaUsersCog, FaEdit, FaListAlt, FaPlusCircle } from 'react-icons/fa';
import { NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Sidebar = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext)
    const [dbUser,setDbUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);


    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/${user.email}`)
                .then(res => {
                    setDbUser(res.data);
                });
        }
    }, [user,axiosSecure]);

   
const navLinks = [
    {
        path: "/",
        label: "Main Home",
        icon: <FaHome />,
        end: false
    },

    ...(dbUser?.role === "admin" ? [
        {
            path: "/dashboard/admin-home",
            label: "Admin Overview",
            icon: <FaThLarge />,
            end: true 
        }
    ] : [
        {
            path: "/dashboard", 
            label: "Dashboard Home",
            icon: <FaThLarge />,
            end: true 
        }
    ]),

    
    {
        path: "/dashboard/profile",
        label: "My Profile",
        icon: <FaUser />,
        end: false
    },

    
    ...(dbUser?.role === "admin" ? [
        {
            path: "/dashboard/all-users",
            label: "All Users",
            icon: <FaUsersCog />,
            end: false
        },
    ] : []),

    
    ...((dbUser?.role === "admin" || dbUser?.role === "volunteer") ? [
        {
            path: "/dashboard/all-donation-requests",
            label: "All Donation Requests",
            icon: <FaClipboardList />, 
            end: false
        },
        {
            path: "/dashboard/content-management",
            label: "Content Management",
            icon: <FaEdit />, 
            end: false
        }
    ] : []),

    
    {
        path: "/dashboard/my-donation-requests",
        label: "My Donation Requests",
        icon: <FaListAlt />,
        end: false
    },
    {
        path: "/dashboard/create-donation-request",
        label: "Create Donation Request",
        icon: <FaPlusCircle />,
        end: false
    },
];
    return (
        <div>
            <div className="lg:hidden flex items-center justify-between bg-secondary p-4 text-white shadow-md">
                <h1 className="text-xl font-bold">Blood Donor</h1>
                <button
                    onClick={toggleSidebar}
                    className="p-2 focus:outline-none hover:bg-red-800 rounded-md transition-colors"
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
                    <h2 className="text-2xl font-extrabold text-secondary tracking-tight">
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
                                    ? "bg-secondary text-white shadow-lg shadow-red-900/20"
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