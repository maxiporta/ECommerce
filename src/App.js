import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './components/navbar/navbar';
import CardDisplay from './components/product/cardDisplay/cardDisplay';
import Contact from './components/contact/contact';
import Footer from './components/footer/footer';

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Navbar/>
        <CardDisplay />
        <Contact/>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
