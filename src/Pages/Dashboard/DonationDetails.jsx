import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthContext';
import Swal from 'sweetalert2';

const DonationDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [request, setRequest] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/donation-request/${id}`)
            .then(res => setRequest(res.data));
    }, [id]);

    const handleConfirmDonation = async (e) => {
        e.preventDefault();

        const donorInfo = {
            donorName: user?.displayName,
            donorEmail: user?.email,
            status: 'inprogress'
        };

        try {
            const res = await axios.patch(`http://localhost:5000/donation-requests/donate/${id}`, donorInfo);
            if (res.data.modifiedCount > 0) {
                document.getElementById('donate_modal').close();
                setRequest({
                    ...request,
                    status: 'inprogress',
                    donorName: user?.displayName,
                    donorEmail: user?.email
                });
                Swal.fire("Confirmed!", "You have committed to this donation.", "success");
            }
        } catch (error) {
            console.log(error)
            Swal.fire("Error", "Could not process request", "error");
        }
    };

    if (!request) return <span className="loading loading-spinner"></span>;
    const isOwner = user?.email === request.requesterEmail;
    return (
        <div className="max-w-4xl mx-auto p-8 my-10 bg-white shadow-xl rounded-2xl border border-gray-100">
            <h2 className="text-3xl font-bold text-secondary mb-6 text-center">Donation Request Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-b py-8">
                <div className="space-y-4">
                    <p><span className="font-bold text-gray-700">Recipient:</span> {request.recipientName}</p>
                    <p><span className="font-bold text-gray-700">Blood Group:</span> <span className="badge badge-error text-white font-bold ml-2">{request.bloodGroup}</span></p>
                    <p><span className="font-bold text-gray-700">Hospital:</span> {request.hospitalName}</p>
                    <p><span className="font-bold text-gray-700">Address:</span> {request.fullAddress}</p>
                </div>
                <div className="space-y-4">
                    <p><span className="font-bold text-gray-700">Location:</span> {request.recipientDistrict}, {request.recipientUpazila}</p>
                    <p><span className="font-bold text-gray-700">Date:</span> {request.donationDate}</p>
                    <p><span className="font-bold text-gray-700">Time:</span> {request.donationTime}</p>
                    <p className="italic text-gray-500 bg-gray-50 p-3 rounded-lg">"{request.requestMessage}"</p>
                </div>
            </div>

            {request.status === 'inprogress' && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
                    <p className="text-blue-700 font-semibold">
                        Donor Assigned: {request.donorName} ({request.donorEmail})
                    </p>
                </div>
            )}

            <div className="mt-8 text-center">
                {request.status === 'pending' ? (
                    user ? (
                        !isOwner ? (
                            <button
                                className="btn btn-secondary text-white px-12 hover:scale-105 transition-transform"
                                onClick={() => document.getElementById('donate_modal').showModal()}
                            >
                                Donate Now
                            </button>
                        ) : (
                            <p className="text-warning font-medium italic">You cannot donate to your own request.</p>
                        )
                    ) : (
                        <p className="text-gray-500 italic">Please login to donate.</p>
                    )
                ) : (
                    <div className="badge badge-lg badge-success text-white p-6 font-bold shadow-md">
                        Status: {request.status.toUpperCase()}
                    </div>
                )}
            </div>

            <dialog id="donate_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-xl mb-4 text-secondary">Confirm Donation</h3>
                    <p className="text-gray-600 mb-6">By clicking confirm, you are committing to provide blood to <strong>{request.recipientName}</strong> at the specified time and location.</p>
                    <form onSubmit={handleConfirmDonation} className="space-y-4">
                        <div className="form-control">
                            <label className="label font-bold text-xs uppercase">Your Name</label>
                            <input type="text" value={user?.displayName} readOnly className="input input-bordered bg-gray-50 font-medium" />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold text-xs uppercase">Your Email</label>
                            <input type="text" value={user?.email} readOnly className="input input-bordered bg-gray-50 font-medium" />
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-secondary text-white">I'll Be There</button>
                            <button type="button" onClick={() => document.getElementById('donate_modal').close()} className="btn btn-ghost">Go Back</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default DonationDetails;