import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import CardDisplay from './components/product/cardDisplay/cardDisplay';
import Footer from './components/footer/footer';
import Cart from './components/cart/cart';
import ProductDetail from './components/ProductDetail/ProductDetail.js';
import Categories from './components/categories/categories.js';
import { CartProvider } from './components/cart/cartContext.js';
import Creator from './components/creator/creator.js';

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<CardDisplay />} />
            <Route path="/creator" element={<Creator />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/categoria/:categoryName" element={<Categories />} />
          </Routes>
        </CartProvider>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
