import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../Provider/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

const Register = () => {
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);

    const [districts, setDistricts] = useState([]);
    const [allUpazilas, setAllUpazilas] = useState([]);

    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedUpazila, setSelectedUpazila] = useState("");


    useEffect(() => {
        axios.get('/District.json').then(res => setDistricts(res.data));
        axios.get('/Upozila.json').then(res => setAllUpazilas(res.data));
    }, []);


    const filteredUpazilas = allUpazilas.filter(u => {
        const districtObj = districts.find(d => d.name === selectedDistrict);
        return districtObj ? u.district_id === districtObj.id : false;
    });


    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedUpazila("");
    };


    const { createUser, updateUser, googleLogin } = use(AuthContext)
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleLogin()
            .then(result => result.user)
        navigate(location?.state || '/')
            .catch(error => {
                console.log(error)
            })
    }

    const handleTogglePasswordShow = (e) => {
        e.preventDefault();
        setShow(!show);
    }



    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo;
        const file = photo.files[0];
        const email = form.email.value;
        const bloodGroup = form.bloodGroup.value;
        const password = form.password.value;
        // const confirmPassword = form.confirm_password.value;

        // //Password Match Validation
        // if (password !== confirmPassword) {
        //     return setError("Passwords do not match!");
        // }

        //Regex Validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return setError("Password must contain at least 6 characters, one uppercase and one lowercase letter.");
        }
        setError("");

        try {
            //ImgBB
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=da8663caf60ec5654ff6eca5850ac8e5`, { image: file }, {

                headers: {

                    'Content-Type': 'multipart/form-data'

                }

            });

            const mainPhotoUrl = res.data.data.display_url;

            const formData = {
                name,
                email,
                avatar: mainPhotoUrl,
                bloodGroup,
                district: selectedDistrict,
                upazila: selectedUpazila,
                role: "donor",
                status: "active"
            };


            createUser(email, password)
                .then(() => {
                    updateUser({ displayName: name, photoURL: mainPhotoUrl }).then(() => {
                        axios.post('https://blood-donation-server-side-ten.vercel.app/users', formData).then(() => {
                            toast.success("Registration Successful!");
                            navigate('/');
                        });
                    });
                });
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
                <h1 className='font-bold text-2xl text-center text-primary'>Register Your Account</h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    <fieldset className="fieldset">
                        {/* name */}
                        <label className="label">Name</label>
                        <input type="text"
                            className="input"
                            placeholder="Name"
                            name='name'
                            required />
                        {/* photo url */}
                        <label className="label">Photo URL</label>
                        <input type="file"
                            className="input"
                            placeholder="Photo URL"
                            name='photo' required />
                        {/* blood group */}
                        <label className="label">Blood Group</label>
                        <select name='bloodGroup'
                            defaultValue="Choose Blood Group"
                            className='select'>
                            <option disabled={true}>Choose Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                        {/* district */}
                        <label className="label">District</label>
                        <select
                            value={selectedDistrict}
                            onChange={handleDistrictChange} // Use the custom handler
                            className='select select-bordered w-full'
                            name="district"
                            required
                        >
                            <option value="" disabled>Select Your District</option>
                            {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                        </select>
                        {/* Upazila */}
                        <label className="label">Upazila</label>
                        <select
                            value={selectedUpazila}
                            onChange={(e) => setSelectedUpazila(e.target.value)}
                            className='select select-bordered w-full'
                            name="upazila"
                            disabled={!selectedDistrict}
                            required
                        >
                            <option value="" disabled>Select Your Upazila</option>
                            {filteredUpazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                        </select>
                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email"
                            className="input"
                            placeholder="Email"
                            name='email' required />
                        {/* password */}
                        <div className="relative">
                            <label className="label">Password</label>
                            <input
                                type={show ? 'text' : 'password'}
                                className="input"
                                placeholder="Password"
                                name='password' required />
                            <button
                                onClick={handleTogglePasswordShow}
                                className='btn btn-xs absolute bottom-1 right-6'>
                                {show ? <FaEyeSlash></FaEyeSlash> : <FaEye size={14} />}
                            </button>

                        </div>
                        {error && <p className="text-red-800 text-sm mt-2">{error}</p>}

                        {/* BTN */}
                        <button type='submit' className="btn btn-secondary mt-4 hover:bg-red-800">Register</button>
                        <button
                            onClick={handleGoogleSignIn}
                            className="btn border-2 border-secondary mt-4 hover:bg-secondary"><FcGoogle size={24} />
                            Register With Google</button>

                        <p className='text-center font-semibold pt-5'>Don't Have an Account?<Link className='text-primary' to="/login">Login</Link></p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};


export default Register;