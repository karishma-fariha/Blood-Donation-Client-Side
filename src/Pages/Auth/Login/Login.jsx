import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../../Provider/AuthContext';


const Login = () => {
    const [email, setEmail] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const { login, googleLogin, setEmailForReset } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleForgetPassword = () => {
        setEmailForReset(email);
        navigate("/auth/forget-password");
    }


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
        setShowPass(!showPass);
    }


    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password)
        login(email, password)
            .then(() => {
                // const user = res.user;
                // console.log(user)
                navigate(`${location.state ? location.state : "/"}`)
            })
            .catch((error) => {
                const errorCode = error.code;
                // const errorMessage = error.message;
                setError(errorCode)
                toast(errorCode)
            });
    }

    return (
         <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
                <h1 className='font-bold text-2xl text-center text-primary'>Login Your Account</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <fieldset className="fieldset">
                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email"
                            className="input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name='email' required />
                        {/* pass */}
                        <div className="relative">
                            <label className="label">Password</label>
                            <input

                                type={showPass ? 'password' : 'text'}
                                className="input"
                                placeholder="Password"
                                name='password' required />
                            <button
                                onClick={handleTogglePasswordShow}
                                className='btn btn-xs absolute bottom-1 right-6'>
                                {showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye size={14} />}
                            </button>
                        </div>

                        <div>
                            <Link onClick={handleForgetPassword} className="link link-hover">
                                Forgot password?</Link>
                        </div>
                        {
                            error && <p className='text-primary'>{error}</p>
                        }
                        <button className="btn btn-secondary mt-4 hover:bg-red-800">Login</button>
                        <button
                            onClick={handleGoogleSignIn}
                            className="btn border-2 border-secondary mt-4 hover:bg-secondary"><FcGoogle size={24} />
                            Login With Google</button>


                        <p className='text-center font-semibold pt-5'>Already Have an Account?<Link className='text-primary' to="/register">Register</Link></p>
                    </fieldset>
                </form>
            </div>
        
    );
};

export default Login;