// PaymentForm.js
import React, { useState, useEffect, useRef } from 'react';
import DropIn from 'braintree-web-drop-in-react';
import SummaryApi from '../common'; // Importing your API

const PaymentForm = () => {
    const [clientToken, setClientToken] = useState(null);
    const instanceRef = useRef();

    useEffect(() => {
        // Fetch the client token from your server
        SummaryApi.get('/braintree/token')
            .then(response => {
                setClientToken(response.data);
            })
            .catch(error => {
                console.error('Error fetching client token:', error);
            });
    }, []);

    const handlePayment = async () => {
        try {
            const instance = instanceRef.current;
            const { nonce } = await instance.requestPaymentMethod();
            
            // Send the nonce to your server
            SummaryApi.post('/payment', { paymentMethodNonce: nonce })
                .then(response => {
                    console.log('Payment successful:', response);
                    // Handle successful payment here
                })
                .catch(error => {
                    console.error('Payment error:', error);
                    // Handle payment error here
                });
        } catch (error) {
            console.error('Payment method request error:', error);
        }
    };

    if (!clientToken) {
        return <div>Loading payment gateway...</div>;
    }

    return (
        <div>
            <DropIn
                options={{ authorization: clientToken }}
                onInstance={instance => (instanceRef.current = instance)}
            />
            <button onClick={handlePayment}>Pay</button>
        </div>
    );
};

export default PaymentForm;
