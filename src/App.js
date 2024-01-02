import React from 'react';
import CardDisplay from './components/product/cardDisplay/cardDisplay';
import Cart from './components/cart/cart';
import Navbar from './components/navbar/navbar';
import Contact from './components/contact/contact';
import Footer from './components/footer/footer';

const App = () => {
  return (
    <div className="app-container">
        <Navbar />
        <CardDisplay onAddToCart={Cart.addToCart} />
        <Cart />
        <Contact />
        <Footer />
      </div>
  );
}

export default App;
