import React, { useEffect, useState } from 'react';
import { getCart, clearCart, removeFromCart, getTotalPrice } from '../cart/cartFunctions';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = getCart();
    setCartItems(items);
  }, []);

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
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
        <button onClick={clearCart}>Clear Cart</button>
        <button>Go to Payment Methods</button>
      </div>
    </div>
  );
}
