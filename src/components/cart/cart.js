import React, { useEffect, useState } from 'react';
import { getCart } from '../cart/cartFunctions';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = getCart();
    setCartItems(items);
  }, []);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <h3>{item.nombre}</h3>
            <p>Price: ${item.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
