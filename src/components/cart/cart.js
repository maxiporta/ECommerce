import React, { useState } from 'react';
import CartDisplay from './cartDisplay/cartDisplay';

const Cart = () => {
  const [carrito, setCarrito] = useState([]);

  const addToCart = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const removeFromCart = (producto) => {
    const nuevoCarrito = carrito.filter(item => item._id !== producto._id);
    setCarrito(nuevoCarrito);
  };

  return <CartDisplay carrito={carrito} onRemoveFromCart={removeFromCart} />;
}

export default Cart;
