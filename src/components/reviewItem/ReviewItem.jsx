import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ReviewItem = ({ product, handleDeleteReviewItem }) => {
  const { _id, img, name, price, quantity } = product;
  return (
    <div className="review-items border border-red-100 rounded-md mb-4 p-2 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={img} className="img-fluid w-20 h-20 rounded-md" alt="" />
          <div className="ml-2">
            <h4 className="font-bold">{name}</h4>
            <p>
              Price: <span className="text-amber-500"> ${price}</span>
            </p>
            <p>
              Shipping:{" "}
              <span className="text-amber-500">
                ${(price * 0.07).toFixed(2)}
              </span>{" "}
            </p>
            <p>
              Quantity: <span className="text-amber-500">{quantity}</span>{" "}
            </p>
          </div>
        </div>
        <button
          onClick={() => handleDeleteReviewItem(_id)}
          className="w-12 h-12 bg-amber-200 hover:bg-yellow-300 shadow-sm rounded-full items-center relative"
        >
          <div className="absolute bottom-2 left-3 cursor-pointer">
            <FontAwesomeIcon
              className="w-6 h-6 text-red-500 hover:text-amber-700"
              icon={faTrashAlt}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
