import React, { useState, useEffect, useCallback } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from '../Components/CheckoutForm';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Funding = () => {
    const axiosSecure = useAxiosSecure();
    const [fundings, setFundings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showStripe, setShowStripe] = useState(false);
    const [donationAmount, setDonationAmount] = useState(20);
    const [refetch, setRefetch] = useState(false);

    // 1. Fetch History logic
    const fetchHistory = useCallback(async () => {
        try {
            const res = await axiosSecure.get('/fundings');
            setFundings(res.data);
        } catch (err) {
            console.error("Error fetching fundings:", err);
        }
    }, [axiosSecure]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory, refetch]);

    // 2. Optimized Effect: Only handle the "Open" delay here
    useEffect(() => {
        let timer;
        if (isModalOpen) {
            timer = setTimeout(() => setShowStripe(true), 200);
        }
        return () => clearTimeout(timer);
    }, [isModalOpen]);

    // 3. Centralized Close Logic: Prevents cascading render warnings
    const handleClose = () => {
        setIsModalOpen(false);
        setShowStripe(false); // Reset here instead of inside the useEffect else branch
    };

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Funding History</h2>
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="btn btn-primary shadow-lg"
                >
                    Give Fund
                </button>
            </div>

            {/* --- PAYMENTS MODAL --- */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box relative shadow-2xl border border-gray-100">
                        <button 
                            onClick={handleClose} 
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                        >✕</button>
                        
                        <h3 className="text-xl font-bold mb-6 text-center">Donate to Support Us</h3>
                        
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text font-semibold">Enter Amount (USD)</span>
                            </label>
                            <input 
                                type="number" 
                                min="1"
                                className="input input-bordered input-primary w-full text-lg" 
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(e.target.value)}
                            />
                        </div>

                        {/* Only mount Stripe Elements when showStripe is true */}
                        {showStripe ? (
                            <Elements stripe={stripePromise}>
                                <CheckoutForm 
                                    price={parseFloat(donationAmount)} 
                                    closeModal={() => {
                                        handleClose();
                                        setRefetch(prev => !prev);
                                    }} 
                                />
                            </Elements>
                        ) : (
                            <div className="flex flex-col items-center py-10 space-y-3">
                                <span className="loading loading-spinner loading-lg text-primary"></span>
                                <p className="text-sm text-gray-400">Securing payment gateway...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- TABLE --- */}
            <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-200">
                <table className="table w-full">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th>User Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {fundings.map(fund => (
                            <tr key={fund._id} className="hover:bg-gray-50">
                                <td className="font-medium text-gray-700">{fund.name}</td>
                                <td className="text-green-600 font-bold">${fund.amount}</td>
                                <td className="text-gray-500">{new Date(fund.date).toLocaleDateString()}</td>
                                <td className="text-xs font-mono text-gray-400">{fund.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {fundings.length === 0 && (
                    <div className="p-20 text-center text-gray-400">
                        No transactions found yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Funding;