import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        //backend API will include later
        console.log("Form Submitted:", formData);
        toast("Thank you! Your message has been sent.");
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="py-20 bg-white" id="contact">
            <div className="container mx-auto px-4">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Get In Touch</h2>
                    <p className="text-gray-500 mt-4">Have questions? We're here to help you save lives.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">


                    <div className="bg-secondary rounded-2xl p-8 md:p-12 text-white">
                        <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                        <p className="mb-8 opacity-90">
                            Reach out to us directly via phone or email. Our team is available 24/7 for emergency blood requests.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="bg-white/20 p-3 rounded-full">
                                    <FaPhoneAlt />
                                </div>
                                <span>+880 1234 567 890</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="bg-white/20 p-3 rounded-full">
                                    <FaEnvelope />
                                </div>
                                <span>support@blooddonation.com</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="bg-white/20 p-3 rounded-full">
                                    <FaMapMarkerAlt />
                                </div>
                                <span>Dhaka, Bangladesh</span>
                            </div>
                        </div>


                        <div className="mt-12 h-32 w-32 bg-white/10 rounded-full blur-3xl absolute -bottom-10 -left-10"></div>
                    </div>


                    <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="How can we help?"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:outline-none"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full font-bold py-3 rounded-lg transition ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-red-800 text-white shadow-md'
                                    }`}
                            >
                                {isSubmitting ? 'Message Sent' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactUs;