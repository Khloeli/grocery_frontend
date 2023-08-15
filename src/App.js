import "./App.css";
import React from "react";
import AddProduct from "./Components/AddProduct";
import SingleProduct from "./Components/SingleProduct";
import axios from "axios";
import { useState, useEffect } from "react";

export default function App() {
  const [openSingle, setOpenSingle] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getInitialData = async () => {
    let initialAPICall = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/products`
    );
    setProducts(initialAPICall.data);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const toggleView = (product) => {
    setOpenSingle(!openSingle);
    setCurrentId(product.id);
  };

  const createNewProduct = async (name, price) => {
    let product = {
      name,
      price,
    };
    let response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/products`,
      product
    );
    let newArray = [...products];
    newArray.push(response.data);
    setProducts(newArray);
  };

  return (
    <div className="App">
      <header className="App-header">
        {openSingle ? (
          <div>
            <SingleProduct
              toggle={toggleView}
              id={currentId}
              setProducts={setProducts}
              products={products}
            />
          </div>
        ) : (
          <div>
            <h3>Grocery Store</h3>
            <h6>Products</h6>
            <div className="products-container">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <div
                    className="product"
                    key={product.id}
                    onClick={() => toggleView(product)}
                  >
                    <h4>{product.name}</h4>
                    <h5>${product.price}</h5>
                  </div>
                ))
              ) : (
                <p>Failure</p>
              )}
            </div>
            <AddProduct addProduct={createNewProduct} />
          </div>
        )}
      </header>
    </div>
  );
}
