import React from 'react';
import { FaHeartbeat, FaUsers, FaMedkit } from 'react-icons/fa'; // Install react-icons

const FeaturedSection = () => {
  const features = [
    {
      id: 1,
      icon: <FaHeartbeat className="text-secondary text-4xl" />,
      title: "Save Lives",
      description: "One single donation can save up to three lives. Your blood helps patients undergoing surgery, cancer treatment, and chronic illnesses."
    },
    {
      id: 2,
      icon: <FaMedkit className="text-secondary text-4xl" />,
      title: "Health Benefits",
      description: "Donating blood can improve your cardiovascular health and reduce iron stores. It's a quick check-up for your pulse, BP, and hemoglobin."
    },
    {
      id: 3,
      icon: <FaUsers className="text-secondary text-4xl" />,
      title: "Join the Community",
      description: "Become part of a massive network of heroes. Connect with people in your area and answer emergency requests in real-time."
    }
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Become a Donor?
          </h2>
          
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center border-t-4 border-secondary"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action Mini-Banner */}
        <div className="mt-16 bg-secondary rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-lg">
          <div>
            <h3 className="text-2xl font-bold mb-2">Ready to make a difference?</h3>
            <p className="opacity-90">Every drop counts. Register now and find blood drives near you.</p>
          </div>
          <button className="mt-6 md:mt-0 bg-white text-secondary font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;