import React from "react";
import ProductCard from "./ProductCard";

function Products({ products }) {
  return (
    <div>
      <h2 className="flex justify-center text-3xl text-red-800 py-5 px-5 ">
        Products
      </h2>
      <div className="grid grid-cols-4 gap-3 justify-items-center">
        {products?.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
}

export default Products;
