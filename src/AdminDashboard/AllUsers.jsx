import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        axios.get(`http://localhost:5000/users?status=${filter}`)
            .then(res => setUsers(res.data));
    }, [filter]);

    const handleRoleChange = (id, newRole) => {
        axios.patch(`http://localhost:5000/users/role/${id}`, { role: newRole })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setUsers(prevUsers =>
                        prevUsers.map(user =>
                            user._id === id ? { ...user, role: newRole } : user
                        )
                    );
                    Swal.fire("Success", `Role updated to ${newRole}`, "success");
                }
            });
    };

    const handleStatusChange = (id, newStatus) => {
        axios.patch(`http://localhost:5000/users/status/${id}`, { status: newStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setUsers(prevUsers => {
                        if (filter !== 'all' && newStatus !== filter) {
                            return prevUsers.filter(user => user._id !== id);
                        }
                        return prevUsers.map(user =>
                            user._id === id ? { ...user, status: newStatus } : user
                        );
                    });
                    Swal.fire("Success", `User is now ${newStatus}`, "success");
                }
            });
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">All Users ({users.length})</h2>

                <select className="select select-bordered" onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Avatar</th>
                            <th>Info</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={u.avatar || "https://via.placeholder.com/150"} alt="User" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className="font-bold">{u.name}</p>
                                    <p className="text-sm opacity-60">{u.email}</p>
                                </td>
                                <td>
                                    <span className={`badge badge-ghost font-semibold ${u.role === 'admin' ? 'text-red-600' : u.role === 'volunteer' ? 'text-blue-600' : ''}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-error'} text-white`}>
                                        {u.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        {/* Role Actions */}
                                        <button onClick={() => handleRoleChange(u._id, 'admin')} className="btn btn-xs btn-outline btn-error" disabled={u.role === 'admin'}>Make Admin</button>
                                        <button onClick={() => handleRoleChange(u._id, 'volunteer')} className="btn btn-xs btn-outline btn-info" disabled={u.role === 'volunteer'}>Make Volunteer</button>

                                        {/* Status Actions */}
                                        {u.status === 'active' ? (
                                            <button onClick={() => handleStatusChange(u._id, 'blocked')} className="btn btn-xs btn-error text-white">Block</button>
                                        ) : (
                                            <button onClick={() => handleStatusChange(u._id, 'active')} className="btn btn-xs btn-success text-white">Unblock</button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;