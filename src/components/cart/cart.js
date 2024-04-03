import React, { useState } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleCancelPurchase = () => {
    setCartItems([]);
  };

  const handleFinishPurchase = () => {
    alert('Compra finalizada');
    setCartItems([]);
  };

  console.log('Cart items:', cartItems);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-buttons">
        <button onClick={handleCancelPurchase}>Cancel Purchase</button>
        <button onClick={handleFinishPurchase}>Go to Payment Methods</button>
      </div>
    </div>
  );
}
