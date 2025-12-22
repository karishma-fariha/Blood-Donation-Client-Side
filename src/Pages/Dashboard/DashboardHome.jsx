import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const DashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [recentRequests, setRecentRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/donation-requests/recent/${user.email}`)
                .then(res => {
                    setRecentRequests(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user,axiosSecure]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/donation-requests/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            setRecentRequests(recentRequests.filter(req => req._id !== id));
                            Swal.fire("Deleted!", "Your request has been removed.", "success");
                        }
                    });
            }
        });
    };

    const handleStatusUpdate = (id, newStatus) => {
        axiosSecure.patch(`/donation-requests/status/${id}`, { status: newStatus })
        .then(res => {
            if (res.data.modifiedCount > 0) {
                setRecentRequests(recentRequests.map(req =>
                    req._id === id ? { ...req, status: newStatus } : req
                ));
                Swal.fire("Success", `Status updated to ${newStatus}`, "success");
            }
        });
    };

    if (loading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="p-6">
            <div className="bg-secondary rounded-2xl p-8 text-white shadow-lg mb-10">
                <h1 className="text-4xl font-extrabold mb-2">Welcome Back, {user?.displayName}!</h1>
                <p className="opacity-90">Manage your donation requests and help save lives today.</p>
            </div>

            {recentRequests.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800">Recent Donation Requests</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-slate-50 text-slate-600">
                                <tr>
                                    <th>Recipient</th>
                                    <th>Location</th>
                                    <th>Date/Time</th>
                                    <th>Status</th>
                                    <th>Donor Info</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentRequests.map((request) => (
                                    <tr key={request._id} className="hover:bg-slate-50 transition-colors">
                                        <td>
                                            <div className="font-bold">{request.recipientName}</div>
                                            <div className="text-xs badge badge-outline">{request.bloodGroup}</div>
                                        </td>
                                        <td className="text-sm">
                                            {request.recipientDistrict}, {request.recipientUpazila}
                                        </td>
                                        <td className="text-sm">
                                            <div>{request.donationDate}</div>
                                            <div className="text-slate-400">{request.donationTime}</div>
                                        </td>
                                        <td>
                                            <span className={`badge font-semibold ${request.status === 'pending' ? 'badge-warning' :
                                                    request.status === 'inprogress' ? 'badge-info' :
                                                        request.status === 'done' ? 'badge-success' : 'badge-ghost text-slate-400'
                                                }`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="text-xs">
                                            {request.status === 'inprogress' ? (
                                                <div>
                                                    <p className="font-semibold">{request.donorName}</p>
                                                    <p>{request.donorEmail}</p>
                                                </div>
                                            ) : "---"}
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                {request.status === 'inprogress' && (
                                                    <>
                                                        <button onClick={() => handleStatusUpdate(request._id, 'done')} className="btn btn-xs btn-success">Done</button>
                                                        <button onClick={() => handleStatusUpdate(request._id, 'canceled')} className="btn btn-xs btn-error">Cancel</button>
                                                    </>
                                                )}

                                                <Link to={`/dashboard/update-donation-request/${request._id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                    <FaEdit />
                                                </Link>
                                                <button onClick={() => handleDelete(request._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                    <FaTrash />
                                                </button>
                                                <Link to={`/donation-details/${request._id}`} className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                                                    <FaEye />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 text-center border-t border-slate-100">
                        <Link to="/dashboard/my-donation-requests">
                            <button className="btn btn-primary px-8">View My All Requests</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;