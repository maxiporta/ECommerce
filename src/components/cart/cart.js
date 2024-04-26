  import React from 'react';
  import { useCart } from './cartContext';
  import './cart.css';

  export default function Cart() {
    const { cart, removeFromCart, clearCart, getTotalPrice } = useCart();

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
                <button id='checkout-btn'>Proceder al pago</button>
            </div>
          </>
        )}
      </div>
    );
  }
