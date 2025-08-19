import { useState, createContext, useReducer } from "react";

export const CartContext = createContext();

const cart = ["Jeans", "Shirt"];

const reducerCart = (state, action) => {
  if (action.type === "ADD_ITEM") {
    return [...state, action.item];
  } else if (action.type === "REMOVE_ITEM") {
    return state.filter((item) => item !== action.item);
  } else if (action.type === "REMOVE_ALL_ITEMS") {
    return [];
  } else {
    return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [cartNumber, setcartNumber] = useState(0);
  const [cartItems, dispatchCart] = useReducer(reducerCart, cart);

  const addToCart = () => {
    setcartNumber(cartNumber + 1);
  };

  return (
    <CartContext.Provider
      value={{cartNumber, addToCart, cartItems, dispatchCart}}
    >
      {children}
    </CartContext.Provider>
  );
};
