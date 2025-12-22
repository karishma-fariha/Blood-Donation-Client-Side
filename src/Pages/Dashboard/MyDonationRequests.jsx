import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyDonationRequests = () => {
        const axiosSecure = useAxiosSecure();

    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [count, setCount] = useState(0);
    const [itemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [filterStatus, setFilterStatus] = useState('all');

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const fetchRequests = useCallback(() => {
        axiosSecure.get(`/donation-requests/my-requests/${user?.email}?page=${currentPage}&size=${itemsPerPage}&status=${filterStatus}`)
            .then(res => {
                setRequests(res.data.result);
                setCount(res.data.count);
            });
    }, [user?.email, currentPage, itemsPerPage, filterStatus,axiosSecure]);

    useEffect(() => {
        if (user?.email) {
            fetchRequests();
        }
    }, [user?.email, fetchRequests]);

    
    const handleStatusUpdate = (id, newStatus) => {
        axiosSecure.patch(`/donation-requests/status/${id}`, { status: newStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    fetchRequests();
                    Swal.fire("Updated", `Status is now ${newStatus}`, "success");
                }
            });
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">My Donation Requests</h2>

              
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={filterStatus}
                    onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(0); }}
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Recipient</th>
                            <th>Location</th>
                            <th>Date/Time</th>
                            <th>Status</th>
                            <th>Donor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req._id}>
                                <td>
                                    <span className="font-bold">{req.recipientName}</span>
                                    <br />
                                    <span className="badge badge-sm">{req.bloodGroup}</span>
                                </td>
                                <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                                <td>{req.donationDate} at {req.donationTime}</td>
                                <td>
                                    <span className={`badge ${req.status === 'pending' ? 'badge-warning' : req.status === 'inprogress' ? 'badge-info' : 'badge-success'}`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td>
                                    {req.status === 'inprogress' ? (
                                        <div className="text-xs">
                                            <p>{req.donorName}</p>
                                            <p>{req.donorEmail}</p>
                                        </div>
                                    ) : "---"}
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        {req.status === 'inprogress' && (
                                            <>
                                                <button onClick={() => handleStatusUpdate(req._id, 'done')} className="btn btn-xs btn-success">Done</button>
                                                <button onClick={() => handleStatusUpdate(req._id, 'canceled')} className="btn btn-xs btn-error text-white">Cancel</button>
                                            </>
                                        )}
                                        <Link to={`/dashboard/update-donation-request/${req._id}`} className="btn btn-ghost btn-xs text-blue-600"><FaEdit /></Link>
                                        <Link to={`/donation-details/${req._id}`} className="btn btn-ghost btn-xs"><FaEye /></Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

       
            <div className="flex justify-center mt-8 gap-2">
                <button
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="btn btn-sm"
                >Prev</button>

                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`btn btn-sm ${currentPage === page ? 'btn-primary' : ''}`}
                    >
                        {page + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === numberOfPages - 1}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="btn btn-sm"
                >Next</button>
            </div>
        </div>
    );
};

export default MyDonationRequests;