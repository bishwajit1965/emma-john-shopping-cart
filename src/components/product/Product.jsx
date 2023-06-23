import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Product = (props) => {
  const { img, name, price, ratings, seller } = props.product;

  const { handleAddToCart } = props;

  return (
    <div className="card shadow-lg relative">
      <img src={img} alt="" className="rounded-t-lg p-1" />
      <div className="text-contents p-2 mb-10">
        <h2>{name}</h2>
        <p>Price: ${price}</p>
        <p>Manufacturer: {seller}</p>
        <p>Rating: {ratings} stars</p>
      </div>
      <div className="absolute bottom-0 left-0 w-full mt-14">
        <button
          onClick={() => handleAddToCart(props.product)}
          className="add-to-cart-btn w-full bg-orange-300 rounded-b-md hover:bg-amber-500"
        >
          Add to cart <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    </div>
  );
};

export default Product;
