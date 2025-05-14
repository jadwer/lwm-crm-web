// Archivo: src/hooks/useCart.ts
"use client";
import { useCartContext } from "@/context/CartContext";
import { Product } from "@/lib/interfaces";

export const useCart = () => {
  const { state, dispatch } = useCartContext();

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const increment = (id: number) => {
    dispatch({ type: "INCREMENT", payload: id });
  };

  const decrement = (id: number) => {
    dispatch({ type: "DECREMENT", payload: id });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  return {
    cartItems: state.items,
    addToCart,
    increment,
    decrement,
    removeFromCart,
  };
};
