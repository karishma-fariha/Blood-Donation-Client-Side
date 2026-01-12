import React from 'react';
import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';

const Logo = ({ isScrolled }) => {
    return (
        <motion.div 
            className='flex items-center space-x-2 group cursor-pointer'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
        >
            {/* Animated Icon Container */}
            <div className="relative flex items-center justify-center">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.2, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute w-10 h-10 bg-red-500/30 rounded-full blur-xl"
                />
                
                <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-linear-to-br from-red-500 to-red-700 p-2 rounded-xl shadow-lg shadow-red-500/20"
                >
                    <Droplets className="text-white w-7 h-7" strokeWidth={2.5} />
                </motion.div>
            </div>

            {/* Project Name */}
            <div className="flex flex-col leading-tight">
                <div className="flex items-center">
                    <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${
                        isScrolled 
                        ? 'bg-clip-text text-transparent bg-linear-to-r from-base-content to-base-content/70' 
                        : 'text-accent'
                    }`}>
                        LIFE
                    </span>
                    <span className="text-2xl font-light tracking-widest text-red-600 ml-1">
                        FLOW
                    </span>
                </div>
                <div className={`h-0.5 w-0 group-hover:w-full transition-all duration-500 ${
                    isScrolled ? 'bg-red-600' : 'bg-white'
                }`} />
            </div>
        </motion.div>
    );
};

export default Logo;