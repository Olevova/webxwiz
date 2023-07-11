import React, { useContext, useRef } from "react";
import Image from "next/image";
import { useCartContext } from "@/context/cardContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartContext();
  // const number = useRef(1);
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <Image
          className="p-8 rounded-t-lg max-w-xs max-h-80"
          src={product.photo}
          alt={product.description}
          width="500"
          height="400"
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h5>
        </a>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {product.price} $
          </span>
          <button
            href="#"
            className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => addToCart({ ...product, quant: 1 })}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
