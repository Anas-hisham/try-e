'use client'

import { useState, useEffect } from "react"; // Add useEffect
import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { ClerkProvider } from '@clerk/nextjs';
import CartContext from './_context/CartContext';

const roboto = Roboto({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart data from local storage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };
  return (
    <ClerkProvider>
      <CartContext.Provider value={{ cart, setCart, removeFromCart }}>
        <html lang="en">
          <body className={`${roboto.variable} font-sans antialiased`}>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </CartContext.Provider>
    </ClerkProvider>
  );
}