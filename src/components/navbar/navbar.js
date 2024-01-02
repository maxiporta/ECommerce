import React from 'react';
import './navbar.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
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
              <NavItem to="/link" label="Link" />
              <NavItemDropdown label="Dropdown">
                <DropdownItem to="/action" label="Action" />
                <DropdownItem to="/another-action" label="Another action" />
                <DropdownItem to="/something-else" label="Something else here" />
              </NavItemDropdown>
              <NavItem to="#" label="Disabled" disabled />
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </Router>
  );
};

// Reusable component for a regular navigation item
const NavItem = ({ to, label, disabled }) => (
  <li className="nav-item">
    <Link className={`nav-link ${disabled ? 'disabled' : ''}`} to={to} aria-disabled={disabled}>
      {label}
    </Link>
  </li>
);

// Reusable component for a dropdown navigation item
const NavItemDropdown = ({ label, children }) => (
  <li className="nav-item dropdown">
    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      {label}
    </Link>
    <ul className="dropdown-menu">{children}</ul>
  </li>
);

// Reusable component for a dropdown item
const DropdownItem = ({ to, label }) => (
  <li>
    <Link className="dropdown-item" to={to}>
      {label}
    </Link>
  </li>
);

export default Navbar;
