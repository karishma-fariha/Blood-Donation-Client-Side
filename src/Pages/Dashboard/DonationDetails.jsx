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
            donorEmail: user?.email
        };

        try {
            const res = await axios.patch(`http://localhost:5000/donation-requests/donate/${id}`, donorInfo);
            if (res.data.modifiedCount > 0) {
                // Close Modal
                document.getElementById('donate_modal').close();
                // Refresh data
                setRequest({ ...request, status: 'inprogress' });
                Swal.fire("Confirmed!", "You have committed to this donation.", "success");
            }
        } catch (error) {
            console.log(error)
            Swal.fire("Error", "Could not process request", "error");
        }
    };

    if (!request) return <span className="loading loading-spinner"></span>;

    return (
        <div className="max-w-4xl mx-auto p-8 my-10 bg-white shadow-lg rounded-xl">
            <h2 className="text-3xl font-bold text-red-600 mb-6">Donation Request Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                <div>
                    <p className="font-bold">Recipient:</p> <p className="mb-4">{request.recipientName}</p>
                    <p className="font-bold">Blood Group:</p> <p className="mb-4 badge badge-error text-white p-3">{request.bloodGroup}</p>
                    <p className="font-bold">Hospital:</p> <p className="mb-4">{request.hospitalName}</p>
                    <p className="font-bold">Address:</p> <p className="mb-4">{request.fullAddress}</p>
                </div>
                <div>
                    <p className="font-bold">Location:</p> <p className="mb-4">{request.recipientDistrict}, {request.recipientUpazila}</p>
                    <p className="font-bold">Date & Time:</p> <p className="mb-4">{request.donationDate} at {request.donationTime}</p>
                    <p className="font-bold">Message:</p> <p className="italic text-gray-600">"{request.requestMessage}"</p>
                </div>
            </div>

            {/* Donate Button - Only show if status is pending */}
            <div className="mt-8 border-t pt-6 text-center">
                {request.status === 'pending' ? (
                    <button 
                        className="btn btn-error text-white px-10"
                        onClick={() => document.getElementById('donate_modal').showModal()}
                    >
                        Donate
                    </button>
                ) : (
                    <div className="badge badge-info p-4 text-white font-bold">This donation is currently {request.status}</div>
                )}
            </div>

            {/* Modal Form */}
            <dialog id="donate_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Confirm Your Donation</h3>
                    <form onSubmit={handleConfirmDonation} className="space-y-4">
                        <div className="form-control">
                            <label className="label">Donor Name</label>
                            <input type="text" value={user?.displayName} readOnly className="input input-bordered bg-gray-100" />
                        </div>
                        <div className="form-control">
                            <label className="label">Donor Email</label>
                            <input type="text" value={user?.email} readOnly className="input input-bordered bg-gray-100" />
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-success text-white">Confirm</button>
                            <button type="button" onClick={() => document.getElementById('donate_modal').close()} className="btn">Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default DonationDetails;