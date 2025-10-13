// import styles from "./Navbar.module.css";
import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">ShipTrack</div>
      <ul className="nav-links">
        <li>Home</li>
        <li>Track Package</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <button className="track-btn">Track Shipment</button>
    </nav>
  );
}

export default Navbar;
