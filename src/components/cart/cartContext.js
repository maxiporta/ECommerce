import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity++;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const existingProductIndex = cart.findIndex((item) => item._id === productId);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      const removedProduct = updatedCart[existingProductIndex];
      removedProduct.quantity--;

      if (removedProduct.quantity <= 0) {
        updatedCart.splice(existingProductIndex, 1);
      }

      setCart(updatedCart);
      return removedProduct;
    }

    return null;
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.precio * item.quantity, 0);
  };

  const getCart = () => {
    return cart;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalPrice, getCart }}>
      {children}
    </CartContext.Provider>
  );
};
