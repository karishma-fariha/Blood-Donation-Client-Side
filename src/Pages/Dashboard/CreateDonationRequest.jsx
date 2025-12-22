import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const CreateDonationRequest = () => {
     const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axiosSecure.get(`/users/${user?.email}`)
            .then(res => {
                setDbUser(res.data);
                setLoading(false);
            });


        fetch('/District.json') 
            .then(res => res.json())
            .then(data => setDistricts(data));

        fetch('/Upozila.json')
            .then(res => res.json())
            .then(data => setUpazilas(data));
    }, [user,axiosSecure]);


    const handleDistrictChange = (e) => {
        const selectedDistrictName = e.target.value;
        const district = districts.find(d => d.name === selectedDistrictName);
        if (district) {
            const filtered = upazilas.filter(u => u.district_id.toString() === district.id.toString());
            setFilteredUpazilas(filtered);
        } else {
            setFilteredUpazilas([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (dbUser?.status === 'blocked') {
            Swal.fire("Action Denied", "Blocked users cannot create donation requests.", "error");
            return;
        }

        const form = e.target;
        const requestData = {
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            recipientName: form.recipientName.value,
            recipientDistrict: form.district.value,
            recipientUpazila: form.upazila.value,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            bloodGroup: form.bloodGroup.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            requestMessage: form.requestMessage.value,
            status: 'pending',
            createdAt: new Date()
        };

        try {
            const res = await axiosSecure.post('/donation-requests', requestData);
            if (res.data.insertedId) {
                Swal.fire("Success!", "Donation request created.", "success");
                navigate('/dashboard/my-donation-requests');
            }
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Could not create request.", "error");
        }
    };

    if (loading) return <span className="loading loading-spinner loading-lg"></span>;

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-2xl my-10">
            <h2 className="text-3xl font-bold text-secondary mb-6 text-center">Create Donation Request</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="form-control">
                    <label className="label font-semibold">Requester Name</label>
                    <input type="text" value={user?.displayName} readOnly className="input input-bordered bg-gray-100" />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Requester Email</label>
                    <input type="text" value={user?.email} readOnly className="input input-bordered bg-gray-100" />
                </div>


                <div className="form-control">
                    <label className="label font-semibold">Recipient Name</label>
                    <input type="text" name="recipientName" required className="input input-bordered" placeholder="Enter recipient name" />
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Blood Group</label>
                    <select name="bloodGroup" required className="select select-bordered">
                        <option value="">Select Blood Group</option>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>
                </div>


                <div className="form-control">
                    <label className="label font-semibold">Recipient District</label>
                    <select
                        name="district"
                        required
                        className="select select-bordered"
                        onChange={handleDistrictChange}>
                        <option value="">Select District</option>
                        {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Recipient Upazila</label>
                    <select
                        name="upazila"
                        required
                        className="select select-bordered"
                        disabled={filteredUpazilas.length === 0}>
                        <option value="">Select Upazila</option>
                        {filteredUpazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Hospital Name</label>
                    <input type="text" name="hospitalName" required className="input input-bordered" placeholder="e.g. Dhaka Medical College" />
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Full Address</label>
                    <input type="text" name="fullAddress" required className="input input-bordered" placeholder="Street address, House No." />
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Donation Date</label>
                    <input type="date" name="donationDate" required className="input input-bordered" />
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Donation Time</label>
                    <input type="time" name="donationTime" required className="input input-bordered" />
                </div>

                <div className="form-control md:col-span-2">
                    <label className="label font-semibold">Request Message</label>
                    <textarea name="requestMessage" required className="textarea textarea-bordered h-24" placeholder="Explain why you need blood..."></textarea>
                </div>

                <div className="md:col-span-2 mt-4">
                    <button
                        type="submit"
                        disabled={dbUser?.status === 'blocked'}
                        className={`btn w-full text-white ${dbUser?.status === 'blocked' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        {dbUser?.status === 'blocked' ? "Account Blocked" : "Request Blood"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateDonationRequest;