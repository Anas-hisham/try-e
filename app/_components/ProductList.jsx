import React from "react";
import ProductTitle from "./ProductItem";

const ProductList = ({ productList }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productList?.length ? (
        productList.map((item) => (
          <ProductTitle key={item.id} product={item} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500 text-lg font-medium">
          No products available
        </p>
      )}
    </div>
  );
};

export default ProductList;
