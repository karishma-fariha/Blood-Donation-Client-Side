import React from 'react';
import { Outlet } from 'react-router';
import blood from '../assets/blood-9256176_1280-removebg-preview.png'
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className="">
                <Navbar></Navbar>
            </div>
            <div className="flex items-center mt-20 gap-10">
            <div className="md:w-1/2 flex justify-center items-center"><Outlet></Outlet></div>
            <div className="md:w-1/2 hidden">
                <img className='' src={blood} alt="" />
            </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default AuthLayout;