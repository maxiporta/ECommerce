import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import CardDisplay from './components/product/cardDisplay/cardDisplay';
import Contact from './components/contact/contact';
import Footer from './components/footer/footer';
import Cart from './components/cart/cart';
import ProductDetail from './components/ProductDetail/ProductDetail.js';
import Categories from './components/categories/categories.js';

const App = () => {
  return (
    <div className="app-container">
      <Router>
      <Navbar/>
        <Routes >
          <Route path="/" element={<CardDisplay/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/categoria/:categoryName" element={<Categories />} />
        </Routes >
      </Router>
      <Footer />
    </div>
  );
};

export default App;
