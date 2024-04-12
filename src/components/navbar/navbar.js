import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../cart/cartContext';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const { getCart } = useCart();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categorias');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const cart = getCart();
  const countProducts = cart.reduce((total, item) => total + item.quantity, 0);
  const showBadge = countProducts > 0;

  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top">
      <div className="container-fluid">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + '/random-logo.png'}
            alt="Navbar Logo"
            className="navbar-logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-between">
            <NavItem to="/" label="Home" />
            <NavItem to="/contact" label="Contacto" />
            <NavItemDropdown label="Categorias">
              {categories.map((category) => (
                <DropdownItem key={category._id} label={category.nombre} categoryName={category.nombre} />
              ))}
            </NavItemDropdown>
          </ul>
          <CartIcon countProducts={countProducts} showBadge={showBadge} />
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, label, disabled }) => (
  <li className="nav-item">
    <Link className={`nav-link ${disabled ? 'disabled' : ''}`} to={to} aria-disabled={disabled}>
      {label}
    </Link>
  </li>
);

const NavItemDropdown = ({ label, children }) => (
  <li className="nav-item dropdown">
    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      {label}
    </Link>
    <ul className="dropdown-menu">{children}</ul>
  </li>
);

const DropdownItem = ({ label, categoryName }) => (
  <li>
    <Link className="dropdown-item" to={`/categoria/${categoryName}`}>
      {label}
    </Link>
  </li>
);

const CartIcon = ({ countProducts, showBadge }) => {
  const cartIconPath = process.env.PUBLIC_URL + '/cart-icon.png';

  return (
    <Link to="/cart" label="cart" className="cart-icon-container">
      <img src={cartIconPath} alt="Cart Icon" className="cart-icon" />
      {showBadge && <div className="cart-badge">{countProducts}</div>}
    </Link>
  );
};

export default Navbar;
