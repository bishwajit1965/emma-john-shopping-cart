import React, { useState } from "react";
import Cart from "../cart/Cart";
import "./Orders.css";
import { Link, useLoaderData } from "react-router-dom";
import ReviewItem from "../reviewItem/ReviewItem";
import { deleteShoppingCart, removeFromDb } from "../utilities/fakedb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);

  const handleDeleteReviewItem = (id) => {
    const remainingReviewItems = cart.filter((product) => product._id !== id);
    setCart(remainingReviewItems);
    removeFromDb(id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="products-cart-wrapper ">
      <div className="products-list">
        {cart.map((product) => (
          <ReviewItem
            key={product._id}
            product={product}
            handleDeleteReviewItem={handleDeleteReviewItem}
          />
        ))}
      </div>
      <div className="cart-container p-4 rounded-t-lg shadow-lg">
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link to="/checkout">
            <div className="bg-amber-500 hover:bg-amber-600 rounded-md mt-5 flex justify-between items-center p-2 text-white shadow-lg">
              <p>Proceed Checkout</p>

              <FontAwesomeIcon
                className="w-6 h-6 text-white hover:text-amber-200"
                icon={faCreditCard}
              />
            </div>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
