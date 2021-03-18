import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "../core/helper/coreapicalls";
function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);
  return (
    <Base title="Home Page" description="Welcome to the Store">
      <div className="">
        <h1 className="text-white"> All of Products</h1>
        <div className="row text-center">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default Home;
