import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [donors, setDonors] = useState([]);
    const [searching, setSearching] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    useEffect(() => {
        fetch('/District.json').then(res => res.json()).then(data => setDistricts(data));
        fetch('/Upozila.json').then(res => res.json()).then(data => setUpazilas(data));
    }, []);


    const handleDistrictChange = (e) => {
        const selectedDistrictName = e.target.value;

        const district = districts.find(d => d.name === selectedDistrictName);

        if (district) {
            const filtered = upazilas.filter(u => u.district_id === district.id);
            setFilteredUpazilas(filtered);
        } else {
            setFilteredUpazilas([]);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearching(true);
        const form = e.target;
        const bloodGroup = form.bloodGroup.value;
        const district = form.district.value;
        const upazila = form.upazila.value;

        const res = await axios.get(`https://blood-donation-server-side-ten.vercel.app/donor-search?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`);
        setDonors(res.data);
        setSearching(false);
    };

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen">
            <h2 className="text-4xl font-extrabold text-center text-red-600 mb-10">Find Blood Donors</h2>

            {/* Search Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-12 border border-gray-100">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="form-control">
                        <label className="label font-bold">Blood Group</label>
                        <select name="bloodGroup" className="select select-bordered w-full" required>
                            <option value="">Select Group</option>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label font-bold">District</label>
                        <select name="district" className="select select-bordered w-full" onChange={handleDistrictChange} required>
                            <option value="">Select District</option>
                            {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label font-bold">Upazila</label>
                        <select name="upazila" className="select select-bordered w-full" required disabled={filteredUpazilas.length === 0}>
                            <option value="">Select Upazila</option>
                            {filteredUpazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-error text-white w-full">Search Donors</button>
                </form>
            </div>


            {searching ? (
                <div className="text-center"><span className="loading loading-spinner loading-lg text-red-600"></span></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {donors.length > 0 ? (
                        donors.map(donor => (
                            <div key={donor._id} className="card bg-base-100 shadow-xl border-t-4 border-red-500">
                                <div className="card-body">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="card-title text-xl">{donor.name}</h3>
                                            <p className="text-sm text-gray-500">{donor.district}, {donor.upazila}</p>
                                        </div>
                                        <div className="badge badge-error text-white p-3 font-bold">{donor.bloodGroup}</div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm"><strong>Email:</strong> {donor.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-gray-50 rounded-xl">
                            <p className="text-gray-400 text-xl font-medium">No donors found. Try different filters.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;