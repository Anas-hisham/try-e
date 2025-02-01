"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import SkeletonProductInfo from "./SkeletonProductInfo";
import CartContext from "../../../_context/CartContext";

const ProductInfo = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext); // Access context with a fallback value
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get("https://api.jsonbin.io/v3/b/679d36a5acd3cb34a8d62ea0").then((response) => {
      console.log(response.data.record.data);
      setCards(response.data.record.data);
    });
  }, []);

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      // login to add to cart
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          product: product.id,
        },
      };
      const existingProduct = cart.find(
        (item) => item.product.id === product.id
      );

      if (!existingProduct) {
        setCart([...cart, { product }]);
        console.log("Added to cart:", product);
      } else {
        console.log("Product is already in the cart.");
      }
    }
  };

  return (
    <div>
      {product ? (
          <div className="max-w-sm p-6 bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-900">{product.title}</h2>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category}
          </p>
      
          <p className="mt-3 text-gray-700 line-clamp-3">{product.description[0]?.children[0]?.text}</p>
      
          <h2 className="mt-4 text-3xl font-bold text-primary">${product.price}</h2>
      
          <button
            onClick={handleAddToCart}
            className="mt-5 flex items-center justify-center gap-2 bg-primary text-white font-medium p-3 rounded-lg w-full hover:bg-teal-600 transition duration-300 active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
            Add To Cart
          </button>
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </div>
  );
};

export default ProductInfo;
