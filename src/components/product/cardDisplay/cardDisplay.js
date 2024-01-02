import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../productCard/productCard';

const CardDisplay = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <div className="product-container">
        {productos.map(producto => (
          <ProductCard key={producto._id} producto={producto} />
        ))}
      </div>
    </div>
  );
}

export default CardDisplay;
