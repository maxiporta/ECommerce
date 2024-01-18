import React from 'react';
import CardDisplay from './components/product/cardDisplay/cardDisplay';
import Navbar from './components/navbar/navbar';
import Contact from './components/contact/contact';
import Footer from './components/footer/footer';

const App = () => {
  return (
    <div className="app-container">
        <Navbar />
        <CardDisplay />
        <Contact />
        <Footer />
      </div>
  );
}

export default App;
