"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";

import ProductBanner from "./_components/ProductBanner";
import ProductInfo from "./_components/ProductInfo";
import ProductList from "../../_components/ProductList";
import BreadCrumb from "../../_components/BreadCrumb";

function ProductDetails() {
  const { productId } = useParams(); // ✅ Get productId from useParams()
  const path = usePathname();

  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState(null);
  const [Cat, setCat] = useState("");
  const [filteredRelated, setFilteredRelated] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.jsonbin.io/v3/b/679d36a5acd3cb34a8d62ea0")
      .then((response) => {
        const { data } = response;

        console.log(data.record.data);
        setProducts(data.record.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    if (!productId || products.length === 0) return;

    const matchingProduct = products.find(
      (product) => product.id === parseInt(productId)
    );

    if (matchingProduct) {
      setFilteredProduct(matchingProduct);
      setCat(matchingProduct.category);
    }
  }, [productId, products]);

  useEffect(() => {
    if (!Cat || products.length === 0) return;

    const matchingProducts = products.filter(
      (product) => product.category === Cat
    );
    setFilteredRelated(matchingProducts);
  }, [Cat, products]);

  return (
    <div className="px-10 py-10 md:px-28">
      <BreadCrumb path={path} />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 
      gap-7 lg:gap-0 justify-around"
      >
        <ProductBanner product={filteredProduct} />
        <ProductInfo product={filteredProduct} />
      </div>
      <div>
        <h2 className="mt-24 text-xl mb-4">Similar Products</h2>
        <ProductList productList={filteredRelated} />
      </div>
    </div>
  );
}

export default ProductDetails;
