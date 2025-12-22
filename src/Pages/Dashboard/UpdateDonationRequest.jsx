import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const UpdateDonationRequest = () => {
        const axiosSecure = useAxiosSecure();

    const { id } = useParams(); 
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    useEffect(() => {
        
        axiosSecure.get(`/donation-request/${id}`)
            .then(res => setRequest(res.data));

        
        fetch('/District.json').then(res => res.json()).then(data => setDistricts(data));
        fetch('/Upozila.json').then(res => res.json()).then(data => setUpazilas(data));
    }, [id,axiosSecure]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const updatedInfo = {
            recipientName: form.recipientName.value,
            recipientDistrict: form.district.value,
            recipientUpazila: form.upazila.value,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            bloodGroup: form.bloodGroup.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            requestMessage: form.requestMessage.value,
        };

        try {
            const res = await axiosSecure.patch(`/update-donation-request/${id}`, updatedInfo);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success!", "Request updated successfully", "success");
                navigate('/dashboard/my-donation-requests');
            }
        } catch (error) {
            console.log(error)
            Swal.fire("Error", "Failed to update", "error");
        }
    };

    if (!request) return <span className="loading loading-spinner"></span>;

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-2xl my-10">
            <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Update Donation Request</h2>
            
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
               
                <div className="form-control">
                    <label className="label font-semibold">Requester Name</label>
                    <input type="text" value={request.requesterName} readOnly className="input input-bordered bg-gray-100" />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Requester Email</label>
                    <input type="text" value={request.requesterEmail} readOnly className="input input-bordered bg-gray-100" />
                </div>

               
                <div className="form-control">
                    <label className="label font-semibold">Recipient Name</label>
                    <input type="text" name="recipientName" defaultValue={request.recipientName} required className="input input-bordered" />
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Blood Group</label>
                    <select name="bloodGroup" defaultValue={request.bloodGroup} required className="select select-bordered">
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Recipient District</label>
                    <select name="district" defaultValue={request.recipientDistrict} required className="select select-bordered">
                        {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Recipient Upazila</label>
                    <select name="upazila" defaultValue={request.recipientUpazila} required className="select select-bordered">
                        {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Hospital Name</label>
                    <input type="text" name="hospitalName" defaultValue={request.hospitalName} required className="input input-bordered" />
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Full Address</label>
                    <input type="text" name="fullAddress" defaultValue={request.fullAddress} required className="input input-bordered" />
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Donation Date</label>
                    <input type="date" name="donationDate" defaultValue={request.donationDate} required className="input input-bordered" />
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Donation Time</label>
                    <input type="time" name="donationTime" defaultValue={request.donationTime} required className="input input-bordered" />
                </div>

                <div className="form-control md:col-span-2">
                    <label className="label font-semibold">Request Message</label>
                    <textarea name="requestMessage" defaultValue={request.requestMessage} required className="textarea textarea-bordered h-24"></textarea>
                </div>

                <div className="md:col-span-2">
                    <button type="submit" className="btn btn-primary w-full text-white">Update Donation Request</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateDonationRequest;