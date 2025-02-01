import { createContext } from "react";

const CartContext = createContext({
  cart: [],
  setCart: () => {},
  removeFromCart: () => {},
});

export default CartContext;
