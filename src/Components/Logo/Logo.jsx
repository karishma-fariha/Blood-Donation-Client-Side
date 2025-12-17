import React from 'react';
import logo from '../../assets/icons8-blood-64.png';

const Logo = () => {
    return (
        <div className='flex items-center space-x-2'>
            <img className='w-12 h-12' src={logo} alt="" />
            <div className="leading-none flex flex-col items-start font-bold text-2xl ">
                <span className='text-secondary'>Blood</span>
                <span>Donation</span>
            </div>
           
        </div>
    );
};

export default Logo;