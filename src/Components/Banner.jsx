import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import bloodDonation1 from '../assets/BloodDonation1.jpg';
import bloodDonation2 from '../assets/BloodDonation2.jpg';
import bloodDonation3 from '../assets/BloodDonation3.jpg';
import bloodDonation4 from '../assets/BloodDonation4.jpg';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Link } from 'react-router';

const Banner = () => {
  
  const slides = [
    { url: bloodDonation1 },
    { url: bloodDonation2},
    { url: bloodDonation3},
    { url: bloodDonation4}
  ];

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
     
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.url})` }}
            >
              
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Save Lives, Donate Blood Today
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">
          Your small contribution can be a huge blessing for someone in need. 
          Join our community of heroes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to='/register'
            className="px-8 py-3 bg-secondary hover:bg-red-800 text-white font-semibold rounded-full transition duration-300 shadow-lg"
          >
            Join as a donor
          </Link>
          
          <Link 
            to='/search'
            className="px-8 py-3 bg-white/40 hover:bg-gray-100 text-secondary font-semibold rounded-full transition duration-300 shadow-lg"
          >
            Search Donors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;