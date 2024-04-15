import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../cart/cartContext';
import './productDetail.css';
import CommentaryForm from '../commentaryForm/comentaryForm';
import Commentaries from '../commentaries/commentaries';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

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
    if (product) {
      addToCart(product);
    }
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
      <div>
        <Commentaries id={id} />
        <CommentaryForm id={id} />,
      </div>
    </div>
  );
};

export default ProductDetail;
