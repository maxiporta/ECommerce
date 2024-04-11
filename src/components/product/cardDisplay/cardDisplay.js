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
        {[0, 1, 2].map((i) => (
          <Carousel.Item key={i}>
            <div className="d-flex justify-content-center">
              {productos.slice(i * 3, i * 3 + 3).map((producto, j) => (
                <ProductCard
                  key={j}
                  producto={producto}
                  showPriceOnHover
                  enlargeOnHover
                  isCenter={j === 1} // Center the middle item
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
