import React, { useEffect, useState } from 'react';
import { getCart, clearCart, removeFromCart, getTotalPrice } from '../cart/cartFunctions';
import './cart.css';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = getCart();
    setCartItems(items);
  }, []);


const handleRemoveItem = (productId) => {
  // Se llama a la función removeFromCart para eliminar el producto del carrito
  const removedProduct = removeFromCart(productId);
  // Si se ha eliminado el producto correctamente
  if (removedProduct) {
    // Se actualiza el estado de los items en el carrito
    setCartItems((prevItems) =>
      // Se mapea sobre los items previos
      prevItems.map((item) =>
        // Si el item es el que se eliminó, se actualiza la cantidad con la cantidad del producto eliminado
        item._id === productId ? { ...item, quantity: removedProduct.quantity } : item
      )
      // Se filtran los items para eliminar aquellos que tengan una cantidad menor o igual a cero
      .filter((item) => item.quantity > 0)
    );
  }
};


  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
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
            <button onClick={() => clearCart(setCartItems)}>Clear Cart</button>
          </div>
          <div>
            <button>Go to Payment Methods</button>
          </div>
        </>
      )}
    </div>
  );
}
