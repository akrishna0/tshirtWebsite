import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import { getToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";

import DropIn from "braintree-web-drop-in-react";

const Payment = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    error: "",
    clientToken: null,
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getmeToken = (userId, token) => {
    getToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const onPurchased = () => {
    setInfo({ loading: true });
    let nonce;

    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData);

          cartEmpty(() => {
            console.log("DID WE CRASH");
          });
          setReload(!reload);
        })
        .catch((err) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + product.price;
    });
    return amount;
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success" onclick={onPurchased}>
              buy
            </button>
          </div>
        ) : (
          <h2> Please Login or Add Something to Cart</h2>
        )}
      </div>
    );
  };

  useEffect(() => {
    getmeToken(userId, token);
  }, []);
  return (
    <div>
      <h3>your Bill is {getAmount()} $</h3>
      {showbtdropIn()}
    </div>
  );
};

export default Payment;
