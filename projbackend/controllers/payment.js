const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "sf59cpbf2ptbgv6w",
  publicKey: "j26jnhwhxt3qqjp6",
  privateKey: "e69baf6509c3e00f3252caaad68b74c4",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};
exports.processPayment = (req, res) => {
  const nonceFromTheClient = req.body.paymentMethodNonce;

  const amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {}
  );
};
