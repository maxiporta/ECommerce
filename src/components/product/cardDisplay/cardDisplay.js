import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../productCard/productCard';

const CardDisplay = () => {
  const [productos, setProductos] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const getProductosDestacados = async () => {
      try {
        const response = await axios.get('http://localhost:5000/productos-destacados');
        setProductos(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProductosDestacados();
  }, []);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // Agrupar los productos en grupos de 3
  const groupedProducts = productos.reduce((acc, product, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(product);
    return acc;
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Productos</h1>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={true}
        indicators={true}
        interval={null} // Set interval to null to allow manual control
        className="custom-carousel"
        wrap={true}
      >
        {groupedProducts.map((group, groupIndex) => (
          <Carousel.Item key={groupIndex}>
            <div className="d-flex justify-content-center">
              {group.map((producto, index) => (
                <ProductCard
                  key={index}
                  producto={producto}
                  showPriceOnHover
                  enlargeOnHover
                />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CardDisplay;
