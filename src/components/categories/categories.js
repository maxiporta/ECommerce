import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductCard from '../product/productCard/productCard';

const Categories = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/productos');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categorias');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const currentCategory = categories.find(category => category.nombre === categoryName);
  const categoryId = currentCategory ? currentCategory._id : null;

  const filteredProducts = products.filter(product => product.categoria === categoryId);

  return (
    <div className="categories">
      <h2>Productos de la categoría {categoryName}</h2>
      <div className="products">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} producto={product} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
