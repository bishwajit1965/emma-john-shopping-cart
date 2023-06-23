import React, { useEffect, useState } from "react";
import Cart from "../cart/Cart";
import Product from "../product/Product";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../utilities/fakedb";
import "./Products.css";
import { Link, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [cart, setCart] = useState([]);

  // Pagination
  const totalProducts = useLoaderData();
  const { totalResult } = totalProducts;
  const totalPages = Math.ceil(totalResult / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()];
  console.log(pageNumbers);

  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    fetch(`http://localhost:5000/productsByIds`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((response) => response.json())
      .then((cartProducts) => {
        console.log(cartProducts);
        const savedCart = [];
        for (const id in storedCart) {
          const addedProduct = cartProducts.find((prod) => prod._id === id);
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      });
  }, []);

  const handleAddToCart = (product) => {
    let newCart = [];
    const existingCart = cart.find((pro) => pro._id === product._id);
    if (!existingCart) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      existingCart.quantity = existingCart.quantity + 1;
      const remainingCart = cart.filter((prod) => prod._id !== product._id);
      newCart = [...remainingCart, existingCart];
    }
    setCart(newCart);
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  // Select items per page
  const options = [5, 10, 15, 20];
  function handleSelectChange(event) {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  }

  return (
    <>
      <div className="products-container">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
        <div className="cart-container p-4 rounded-t-lg shadow-lg">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link to="/order">
              {" "}
              <div className="bg-amber-500 rounded-md mt-5 flex justify-between items-center p-2 cursor-pointer shadow-lg">
                <div className="text-white">
                  <p>Review orders</p>
                </div>

                <FontAwesomeIcon
                  className="w-6 h-6 text-white hover:text-amber-700"
                  icon={faArrowAltCircleRight}
                />
              </div>
            </Link>
          </Cart>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <p>
          {currentPage} and items per page {itemsPerPage}
        </p>
        {pageNumbers.map((number) => (
          <button
            className={currentPage === number ? "selected" : ""}
            onClick={() => setCurrentPage(number)}
            key={number}
          >
            {number}
          </button>
        ))}

        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Products;
