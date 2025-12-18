import React from 'react';
import { Outlet } from 'react-router';
import blood from '../assets/blood-9256176_1280-removebg-preview.png'
import Navbar from '../Pages/Shared/Navbar/Navbar';
const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className="">
                <Navbar></Navbar>
            </div>
            <div className="flex items-center mt-20 gap-10">
            <div className="flex-1"><Outlet></Outlet></div>
            <div className="flex-1">
                <img className='' src={blood} alt="" />
            </div>
            </div>
        </div>
    );
};

export default AuthLayout;