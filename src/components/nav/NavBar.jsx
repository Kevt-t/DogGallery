import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/favorites" className="nav-link">Favorites</Link>
      <Link to="/settings" className="nav-link">Settings</Link>
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
    </nav>
  );
}
