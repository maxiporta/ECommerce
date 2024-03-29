import React from 'react';

const Cart = () => {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {/* items */}
      </div>
      <div className="cart-buttons">
        <button>Cancel Purchase</button>
        <button>Go to Payment Methods</button>
      </div>
    </div>
  );
}

export default Cart;
