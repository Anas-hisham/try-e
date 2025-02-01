"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import ProductList from "./ProductList";

const ProductSection = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Fetch products directly with Axios
    axios
      .get("https://api.jsonbin.io/v3/b/679d36a5acd3cb34a8d62ea0")
      .then((res) => {
        console.log(res.data.record.data); // Debugging
        setProductList(res.data.record.data); // Corrected data extraction
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []); // Run once when component mounts

  return (
    <div className="px-10 md:px-20">
      <h2 className="my-4 text-xl">Our Latest Products</h2>
      <ProductList productList={productList} />
    </div>
  );
};

export default ProductSection;
