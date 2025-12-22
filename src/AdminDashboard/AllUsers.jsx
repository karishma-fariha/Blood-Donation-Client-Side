import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user: currentUser } = useContext(AuthContext); 
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    // Fetch users whenever the filter changes
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // We don't call setLoading(true) here to avoid the cascading render warning
                // instead, the filter handler or the initial state handles it.
                const res = await axiosSecure.get(`/users?status=${filter}`);
                setUsers(res.data);
            } catch (error) {
                console.error("Error fetching users:", error);
                Swal.fire("Error", "Failed to load users", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [filter,axiosSecure]);

    // Handler for filter changes
    const handleFilterChange = (e) => {
        setLoading(true); // Trigger loading before state change
        setFilter(e.target.value);
    };

    const handleRoleChange = async (id, newRole, userEmail) => {
        if (userEmail === currentUser?.email) {
            return Swal.fire("Action Denied", "You cannot change your own role.", "warning");
        }

        try {
            const res = await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
            if (res.data.modifiedCount > 0) {
                setUsers(prev => prev.map(u => u._id === id ? { ...u, role: newRole } : u));
                Swal.fire("Updated!", `User role is now ${newRole}`, "success");
            }
        } catch (error) {
            console.log(error)
            Swal.fire("Error", "Failed to update role", "error");
        }
    };

    const handleStatusChange = async (id, newStatus, userEmail) => {
        if (userEmail === currentUser?.email) {
            return Swal.fire("Action Denied", "You cannot block yourself.", "warning");
        }

        try {
            const res = await axiosSecure.patch(`/users/status/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                // If we are in a filtered view, remove the user from the list if they no longer match
                if (filter !== 'all' && newStatus !== filter) {
                    setUsers(prev => prev.filter(u => u._id !== id));
                } else {
                    setUsers(prev => prev.map(u => u._id === id ? { ...u, status: newStatus } : u));
                }
                Swal.fire("Success!", `User status changed to ${newStatus}`, "success");
            }
        } catch (error) {
         console.log(error)
            Swal.fire("Error", "Failed to update status", "error");
        }
    };

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm">
                <div>
                    <h2 className="text-2xl font-extrabold text-gray-800">User Management</h2>
                    <p className="text-sm text-gray-500 font-medium">Manage permissions and account statuses</p>
                </div>

                <div className="flex items-center gap-3">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Status:</label>
                    <select 
                        value={filter}
                        className="select select-bordered select-sm focus:ring-2 focus:ring-red-500 outline-none" 
                        onChange={handleFilterChange}
                    >
                        <option value="all">All Users</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="loading loading-spinner loading-lg text-red-600"></span>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead className="bg-gray-50">
                                    <tr className="text-gray-600">
                                        <th className="py-4">User Details</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map(u => (
                                            <tr key={u._id} className="hover:bg-gray-50 transition-colors border-b last:border-0">
                                                <td className="py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={u.avatar || "https://i.ibb.co/vBR649p/user-placeholder.png"} alt="User" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-gray-800 flex items-center gap-2">
                                                                {u.name}
                                                                {u.email === currentUser?.email && <span className="badge badge-primary badge-xs py-2">YOU</span>}
                                                            </div>
                                                            <div className="text-xs text-gray-500">{u.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                        u.role === 'admin' ? 'bg-red-100 text-red-700' : 
                                                        u.role === 'volunteer' ? 'bg-blue-100 text-blue-700' : 
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className={`badge badge-sm font-bold border-none ${u.status === 'active' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                                                        {u.status}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex justify-center gap-2">
                                                        {/* Role Toggle Buttons */}
                                                        <button 
                                                            onClick={() => handleRoleChange(u._id, 'admin', u.email)} 
                                                            className="btn btn-xs btn-outline hover:bg-red-600 hover:border-red-600" 
                                                            disabled={u.role === 'admin' || u.email === currentUser?.email}
                                                        >Admin</button>
                                                        
                                                        <button 
                                                            onClick={() => handleRoleChange(u._id, 'volunteer', u.email)} 
                                                            className="btn btn-xs btn-outline hover:bg-blue-600 hover:border-blue-600" 
                                                            disabled={u.role === 'volunteer' || u.email === currentUser?.email}
                                                        >Volunteer</button>

                                                        {/* Status Toggle Buttons */}
                                                        {u.status === 'active' ? (
                                                            <button 
                                                                onClick={() => handleStatusChange(u._id, 'blocked', u.email)} 
                                                                className="btn btn-xs btn-error text-white"
                                                                disabled={u.email === currentUser?.email}
                                                            >Block</button>
                                                        ) : (
                                                            <button 
                                                                onClick={() => handleStatusChange(u._id, 'active', u.email)} 
                                                                className="btn btn-xs btn-success text-white"
                                                                disabled={u.email === currentUser?.email}
                                                            >Unblock</button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-20 text-gray-400 italic">No users found matching this criteria.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUsers;