import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentProccess = () => {
    const [paymentError, setPaymentError] = useState(null)
    const [paymentSuccess, setPaymentSuccess] =  useState(null)
    
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            // console.log('[error]', error);
            setPaymentError(error.message)
            setPaymentSuccess('')
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
            // alert('Payment success')
            setPaymentSuccess(paymentMethod)
            setPaymentError('')
        }
    }

    return (
        <div>
            <form className="w-50 ps-5 ms-5" onSubmit={handleSubmit}>
            <CardElement />
                <button className="mt-5" type="submit" disabled={!stripe}>
                    Pay
                 </button>
            </form>
            {
                paymentError && <p className='text-danger'>{paymentError}</p>
            }
            {
                paymentSuccess && <p className='text-primary '>payment success</p>
            }
        </div>
    );
};

export default PaymentProccess;