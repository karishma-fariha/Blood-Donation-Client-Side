import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Typewriter from 'typewriter-effect';
import { Search, Activity, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Banner = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    const slides = [
        { url: "https://images.unsplash.com/photo-1615461066159-fea0960485d5?auto=format&fit=crop&q=80&w=1920" },
        { url: "https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?auto=format&fit=crop&q=80&w=1920" },
        { url: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1920" }
    ];

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
          .fromTo(contentRef.current.children, 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 }, 
            "-=0.5"
        );
    }, []);

    const lifelinePath = "M0,50 L20,50 L30,20 L40,80 L50,50 L100,50 L120,50 L130,10 L140,90 L150,50 L200,50 L220,50 L230,30 L240,70 L250,50 L300,50";

    return (
        <div ref={containerRef} className="relative h-[85vh] sm:h-[80vh] lg:h-screen w-full overflow-hidden bg-black">
            
            {/* Background Swiper */}
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <motion.div 
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 6 }}
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.url})` }}
                        >
                            <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/50 to-black/80 lg:bg-linear-to-r lg:from-black/90 lg:via-black/60 lg:to-transparent"></div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Responsive Lifeline Effect */}
            <div className="absolute inset-0 z-5 flex items-center justify-center opacity-10 lg:opacity-20 pointer-events-none overflow-hidden">
                 <svg viewBox="0 0 300 100" className="w-[200%] md:w-full h-auto text-red-600">
                    <motion.path
                        d={lifelinePath}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                    />
                </svg>
            </div>

            {/* Main Content */}
            <div ref={contentRef} className="absolute inset-0 z-10 flex flex-col items-center lg:items-start justify-center px-4 sm:px-10 md:px-20 lg:px-32 text-center lg:text-left">
                
                {/* Badge */}
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full mb-6">
                    <Activity size={14} className="text-red-500 animate-pulse" />
                    <span className="text-red-500 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">Live Connection</span>
                </div>

                {/* Responsive Typography */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight max-w-[18ch] lg:max-w-3xl">
                    Every Drop <br className="hidden sm:block" /> 
                    <span className="text-red-600">
                        <Typewriter
                            options={{
                                strings: ['Saves a Life.', 'Matters.', 'Is a Hope.'],
                                autoStart: true, loop: true, deleteSpeed: 50,
                            }}
                        />
                    </span>
                </h1>

                <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-xs sm:max-w-md lg:max-w-xl font-normal leading-relaxed opacity-80">
                    Join <span className="text-white font-semibold">LifeFlow</span>, the most efficient medical network connecting heroes with those in need.
                </p>

                {/* Responsive Buttons: Stacked on mobile, row on tablet+ */}
                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <Link
                        to='/register'
                        className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-bold rounded-sm transition-all shadow-xl shadow-red-900/20"
                    >
                        <span>Become a Donor</span>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link 
                        to='/search'
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white text-sm sm:text-base font-bold rounded-sm transition-all"
                    >
                        <Search size={18} />
                        <span>Find Blood</span>
                    </Link>
                </div>

                {/* Mobile-only Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:hidden">
                    <motion.div 
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center p-1"
                    >
                        <div className="w-1 h-1 bg-red-600 rounded-full" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Banner;