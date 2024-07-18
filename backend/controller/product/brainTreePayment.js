// server.js (Node.js Express example)
const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

app.get('/api/braintree/token', (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send(response.clientToken);
    });
});


// server.js
app.post('/api/payment', (req, res) => {
    const nonceFromTheClient = req.body.paymentMethodNonce;

    gateway.transaction.sale({
        amount: '10.00', // You can dynamically set the amount
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send(result);
    });
});
