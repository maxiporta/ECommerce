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
                <p>Price: ${item.precio}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <p>Total: ${getTotalPrice()}</p>
          </div>
          <div className="cart-buttons">
            <button onClick={() => clearCart()}>Clear Cart</button>
          </div>
          <div>
            <button>Go to Payment Methods</button>
          </div>
        </>
      )}
    </div>
  );
}
