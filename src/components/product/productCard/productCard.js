import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './productCard.css';

const ProductCard = ({ producto, showPriceOnHover, isCenter }) => {
  const { _id, nombre, imagen, descripcion, precio } = producto;
  const imagenPath = `http://localhost:5000/uploads/${imagen}`;
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`product-card ${isCenter ? 'center-product' : ''} ${hovered ? 'enlarged' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${_id}`} className="product-link">
        <img src={imagenPath} alt={nombre} className="product-image" />
        <h2 className="product-title">{nombre}</h2>
        <div className="product-details">
          <p className="product-description">{descripcion}</p>
          {showPriceOnHover && hovered && <p className="product-price">${precio}</p>}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
