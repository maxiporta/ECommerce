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
        console.log(response)
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    
    getProductById();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h2>{product.nombre}</h2>
      <img src={`http://localhost:5000/uploads/${product.imagen}`} alt={product.nombre} />
      <p>{product.descripcion}</p>
      <p>Precio: ${product.precio}</p>
    </div>
  );
}

export default ProductDetail;
