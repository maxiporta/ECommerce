import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import ProductCard from '../productCard/productCard';

const CardDisplay = () => {
  const [productos, setProductos] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
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
      >
        <Carousel.Item>
          <div className="d-flex justify-content-center">
            {productos.slice(0, 3).map((producto, i) => (
              <ProductCard
                key={i}
                producto={producto}
                showPriceOnHover
                enlargeOnHover
                isCenter={i === index % 3}
              />
            ))}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex justify-content-center">
            {productos.slice(3, 6).map((producto, i) => (
              <ProductCard
                key={i}
                producto={producto}
                showPriceOnHover
                enlargeOnHover
                isCenter={i === index % 3}
              />
            ))}
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CardDisplay;
