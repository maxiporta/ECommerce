import React from 'react';
import './productCard.css';

const ProductCard = ({ producto, onAddToCart }) => {
  const { _id, nombre, imagen, descripcion, precio } = producto;

  return (
    <div className="product-card">
      <img src={imagen} alt={nombre} className="product-image" />
      <h2 className="product-title">{nombre}</h2>
      <p className="product-description">{descripcion}</p>
      <p className="product-price">${precio}</p>
      <button onClick={() => onAddToCart(producto)}>Agregar al Carrito</button>
    </div>
  );
}

export default ProductCard;