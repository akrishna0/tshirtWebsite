const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: 'snf9mbw62pt2csgw',
  publicKey: 'vkxpxjbvncg3s394',
  privateKey: '17de83929dd9b8e3ed56ccb285886a3d',
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function(err, response)  {
    console.log("SISSE _______ ", response)
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response);
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
    (err, result) => {
      if(err){
        res.status(500).json(err);
      }else{
        res.json(result)
      }
    }
  );
};
