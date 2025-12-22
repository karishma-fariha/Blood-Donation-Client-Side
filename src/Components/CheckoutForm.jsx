import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthContext";

const CheckoutForm = ({ price, closeModal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || price <= 0) return;

        const card = elements.getElement(CardElement);
        if (card === null) return;

        setProcessing(true);

        try {
            // 1. Create Payment Intent
            const { data } = await axiosSecure.post('/create-payment-intent', { price });
            const clientSecret = data.clientSecret;

            // 2. Confirm Payment
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            });

            if (confirmError) {
                Swal.fire("Error", confirmError.message, "error");
            } else if (paymentIntent.status === 'succeeded') {
                // 3. Save to Database
                const fundingInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    amount: price,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                };
                
                const res = await axiosSecure.post('/fundings', fundingInfo);
                if (res.data.insertedId) {
                    Swal.fire("Success", `Transaction ID: ${paymentIntent.id}`, "success");
                    closeModal(); // This will close modal and trigger refetch in parent
                }
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Payment processing failed", "error");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 border rounded-lg bg-gray-50">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                            },
                            invalid: { color: '#9e2146' },
                        },
                    }}
                />
            </div>
            <button
                type="submit"
                disabled={!stripe || processing || !price}
                className="btn btn-primary w-full"
            >
                {processing ? "Processing..." : `Pay $${price}`}
            </button>
        </form>
    );
};

export default CheckoutForm;