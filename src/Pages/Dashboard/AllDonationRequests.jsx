import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaEye } from 'react-icons/fa';
import Loading from '../Loading';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AllDonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

   const axiosSecure = useAxiosSecure();

useEffect(() => {
    axiosSecure.get('/all-pending-requests')
        .then(res => {
            setRequests(res.data);
            setLoading(false);
        });
}, [axiosSecure]);

    if (loading) return <Loading></Loading>

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Pending Blood Requests</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Below is a list of people who urgently need blood donations. Please review the details and help if you can.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-red-50 text-red-700">
                            <tr>
                                <th className="py-4 px-6">Recipient</th>
                                <th>Location</th>
                                <th>Date & Time</th>
                                <th>Blood Group</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length > 0 ? (
                                requests.map((req) => (
                                    <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-gray-800">{req.recipientName}</div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <FaMapMarkerAlt className="text-red-500" />
                                                {req.recipientUpazila}, {req.recipientDistrict}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-sm space-y-1">
                                                <div className="flex items-center gap-2"><FaCalendarAlt className="text-gray-400" /> {req.donationDate}</div>
                                                <div className="flex items-center gap-2"><FaClock className="text-gray-400" /> {req.donationTime}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge badge-error text-white p-3 font-bold ring-2 ring-red-100">
                                                {req.bloodGroup}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <Link
                                                to={`/donation-details/${req._id}`}
                                                className="btn btn-sm btn-outline btn-secondary hover:btn-secondary"
                                            >
                                                <FaEye /> View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-20 text-gray-400 italic">
                                        No pending requests found at the moment.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllDonationRequests;