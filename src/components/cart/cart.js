import React from 'react';
import { useCart } from './cartContext';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';
import { useState } from 'react';
import './cart.css';

export default function Cart() {
  const { cart, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago('TEST-c99601b9-085c-44b6-bbcb-99cfba1858f0', {
      locale: 'es-AR'
  });

  const createPreference = async () => {
    try {
      const items = cart.map((item) => ({
        title: item.nombre,
        quantity: item.quantity,
        price: item.precio,
      }));
  
      const total = getTotalPrice();
  
      const response = await axios.post("http://localhost:5000/create_preference", {
        items,
        total,
      });
  
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleBuy = async() => {
      const id = await createPreference();
      if (id) {
          setPreferenceId(id);
      }
  }

  const handleRemoveItem = (productId) => {
    const removedProduct = removeFromCart(productId);
    if (removedProduct) {
    }
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <h3>{item.nombre}</h3>
                <p>Precio: ${item.precio}</p>
                <p>Cantidad: {item.quantity}</p>
                <button onClick={() => handleRemoveItem(item._id)}>Eliminar</button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <p>Total: ${getTotalPrice()}</p>
          </div>
          <div className="cart-buttons">
            <button onClick={() => clearCart()}>Vaciar Carrito</button>
          </div>
          <div>
              <button id='checkout-btn' onClick={handleBuy}>Proceder al pago</button>
              { preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
          </div>
        </>
      )}
    </div>
  );
}
