"use client";
import React, { useContext, useEffect } from "react";
import CartContext from "../_context/CartContext";
import { useRouter } from "next/navigation";

const Cart = ({ cartIconRef }) => {
  const { cart, setCart } = useContext(CartContext); // Access context with a fallback value
  const router = useRouter();

  return (
    <div
      className="h-[300px] w-[250px] bg-gray-100 z-10 rounded-md
    border shadow-sm absolute max-10 right-10 top-12 overflow-auto flex flex-col items-center
    "
    >
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li key={index} className="flex items-center gap-4">
              <img
                src={item?.product?.banner?.url}
                alt=""
                className="size-16 rounded object-cover"
              />

              <div>
                <h3 className="text-sm text-gray-900 line-clamp-1">
                  {item?.product?.title}
                </h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">Category:</dt>
                    <dd className="inline">{item?.product?.category}</dd>
                  </div>

                  <div>
                    <dt className="inline">Price:</dt>
                    <dd className="inline">{item?.product?.price}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4 text-center mt-5">
        <button
          onClick={() => {
            router.push("/cart");
            cartIconRef.current.click();
          }}
          className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
        >
          View my cart ({cart?.length})
        </button>

        <a
          href="#"
          className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
        >
          Checkout
        </a>

        <a
          href="#"
          className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
        >
          Continue shopping
        </a>
      </div>
    </div>
  );
};

export default Cart;
