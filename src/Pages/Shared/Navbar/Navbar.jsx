import React, { use } from 'react';
import Logo from '../../../Components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import userImg from '../../../assets/user.png';
import ThemeToggle from '../../../Components/ThemeToggle';
import { AuthContext } from '../../../Provider/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logout } = use(AuthContext);
    const handleLogout = () => {
        // console.log('logout')
        logout().then(() => {
            toast('You Logout Successfully..');
        }).catch((error) => {
            alert(error)
            toast(error);
            // An error happened.
        });;
    }
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="">Donation Requests</NavLink></li>
        <li><NavLink to="">Funding </NavLink></li>


    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[50px] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl"><Logo></Logo></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-5">
                {user ?
                    (<div className="dropdown dropdown-end">
                        <div tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar">
                            <div className="md:w-10 w-7 rounded-full">
                                <img src={userImg} alt="User" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[50px] w-52 p-2 shadow-sm mt-3 border border-gray-100 text-secondary font-bold">
                            <li><button onClick={handleLogout} className=''>LogOut</button></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        </ul>
                    </div>)


                    :
                    (<div className="md:flex md:gap-4">
                        <Link to="/login"
                            className='btn btn-primary md:px-14'>
                            Login</Link>

                        <Link to="/register"
                            className='btn border-2 border-primary md:px-14'>
                            Registration</Link>
                    </div>)


                }
                <ThemeToggle></ThemeToggle>
            </div>
        </div>
    );
};

export default Navbar;