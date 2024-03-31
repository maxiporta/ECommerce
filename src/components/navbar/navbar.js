import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                            <DropdownItem to="/categoria1" label="Categoria 1" />
                            <DropdownItem to="/categoria2" label="Categoria 2" />
                            <DropdownItem to="/categoria3" label="Categoria 3" />
                        </NavItemDropdown>
                    </ul>
                    <CartIcon />
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

const DropdownItem = ({ to, label }) => (
    <li>
        <Link className="dropdown-item" to={to}>
            {label}
        </Link>
    </li>
);

const CartIcon = () => {
    const cartIconPath = process.env.PUBLIC_URL + '/cart-icon.png';

    return (
            <Link to="/cart" label="cart">
                <img src={cartIconPath} alt="Cart Icon" className="cart-icon" />
            </Link>
    );
};

export default Navbar;
