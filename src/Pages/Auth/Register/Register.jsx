import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../Provider/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
    const [error, setError] = useState("");
    const [show, setShow] = useState(false)

    const { createUser, setUser, updateUser,googleLogin } = use(AuthContext)
    const navigate = useNavigate();

     const handleGoogleSignIn=()=>{
      googleLogin()
      .then(result=>result.user)
      navigate(location?.state || '/')
      .catch(error =>{
        console.log(error)
      })
    }

    const handleTogglePasswordShow = (e) => {
        e.preventDefault();
        setShow(!show);
    }



    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError(
                "Password must contain at least 6 characters, one uppercase and one lowercase letter."
            );
            return;
        }
        setError("");
        // console.log(name, password, email, photo);
        createUser(email, password)
            .then((res) => {
                const user = res.user;
                // console.log(user);
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        navigate('/')
                    })
                    .catch((error) => {
                        console.log(error);
                        setUser(user);
                    });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast(errorMessage, errorCode)
                // ..
            });



    }
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
                        <input type="text"
                            className="input"
                            placeholder="Photo URL"
                            name='photo' required />
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

                        <p className='text-center font-semibold pt-5'>Don't Have an Account?<Link className='text-primary' to="/auth/login">Login</Link></p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};


export default Register;