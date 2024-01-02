import React from 'react';

const CartDisplay = ({ carrito, onRemoveFromCart }) => {
  const calcularTotal = () => {
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    return total;
  };

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      <div className="cart-items">
        {carrito.map(producto => (
          <div key={producto._id} className="cart-item">
            <p>{producto.nombre} - ${producto.precio.toFixed(2)}</p>
            <button onClick={() => onRemoveFromCart(producto)}>Eliminar</button>
          </div>
        ))}
      </div>
      <h3>Total: ${calcularTotal()}</h3>
    </div>
  );
}

export default CartDisplay;
