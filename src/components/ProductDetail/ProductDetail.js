import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    
    getProductById();
  }, [id]);

  const handleAddToCart = () => {
    // Aquí puedes implementar la lógica para agregar el producto al carrito
    console.log('Producto agregado al carrito:', product);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h2>{product.nombre}</h2>
      <img src={`http://localhost:5000/uploads/${product.imagen}`} alt={product.nombre} />
      <p>{product.descripcion}</p>
      <p>Precio: ${product.precio}</p>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
};

export default ProductDetail;
