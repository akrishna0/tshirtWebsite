import React, { useState, useEffect } from "react";
import "../styles.css";

import Base from "./Base";
import Card from "./Card";

import { loadCart } from "./helper/CartHelper";
import Payment from "./Payment";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setProducts(loadCart);
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h1>This is load All products</h1>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h1>This is Checkout section</h1>
      </div>
    );
  };
  return (
    <Base title="Cart Page" description="Check your Cart">
      <div className="row">
        <div className="col-6">
          {products?.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No Products in Cart</h3>
          )}
        </div>
        <div className="col-6">
          <Payment products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
