"use client";
import React, { useContext, useState } from "react";
import CartContext from "../_context/CartContext";
import Swal from "sweetalert2";

const Page = () => {
  const { cart, setCart, removeFromCart } = useContext(CartContext);
  const [Booked, setBooked] = useState(false);

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const price = +item?.product?.price;
      return !isNaN(price) ? total + price : total;
    }, 0);
  };

  const sendEmail = async (cartData, total, email) => {
    try {
      const cartDetails = cartData
        .map(
          (item) => `
            ${item?.product?.title}
            Category: ${item?.product?.category}
            Price: $${item?.product?.price}
          `
        )
        .join("");

      const formData = new FormData();
      formData.append("access_key", "5a1961d2-11ea-4017-b372-42cbcb1e597e");
      formData.append("email", email);
      formData.append("subject", "Your Cart Details");
      formData.append(
        "message",
        `Your Cart Details${cartDetails}
        Total: $${total}
        `
      );

      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();
      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "The items have been sent to your email.",
          icon: "success",
        });
        setBooked(true);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to send email.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred while sending the email.",
        icon: "error",
      });
    }
  };

  const handleCheckout = () => {
    Swal.fire({
      title: "Do you want to buy them?",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email",
      showCancelButton: true,
      confirmButtonText: "Yes",
      preConfirm: (email) => {
        if (!email) {
          Swal.showValidationMessage("Please enter your email");
        }
        return email;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const email = result.value; // Get the email from the SweetAlert input
        const total = getTotal(); // Calculate total before clearing the cart
        sendEmail(cart, total, email); // Pass cart data, total, and email to sendEmail
        setCart([]); // Clear the cart after sending the email
      }
    });
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <img
                    src={item?.product?.banner?.url}
                    alt=""
                    className="size-16 rounded object-cover"
                  />

                  <div>
                    <h3 className="text-sm text-gray-900">
                      {item?.product?.title}
                    </h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline">Category: </dt>
                        <dd className="inline">{item?.product?.category}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    ${item?.product?.price}
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-gray-600 transition hover:text-red-600"
                    >
                      <span className="sr-only">Remove item</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>${getTotal()}</dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <button
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    onClick={handleCheckout}
                  >
                    Book The Course
                  </button>
                </div>
              </div>
            </div>
            {Booked && (
              <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      We will contact you soon after sending the email. Thank
                      you!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
