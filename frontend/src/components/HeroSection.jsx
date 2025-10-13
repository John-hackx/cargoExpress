import React from "react";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Fast, Reliable Shipping & Real-Time Tracking</h1>
          <p>
            Track your packages from dispatch to delivery — anytime, anywhere.
            Experience seamless logistics with our advanced tracking system.
          </p>
          <div className="hero-buttons">
            <button className="track-now">Track Now</button>
            <button className="learn-more">Learn More</button>
          </div>
        </div>
        <div className="tracking-card">
          <h3>Real-Time Location</h3>
          <p>Track every mile</p>
          <ul>
            <li>
              <span className="dot green"></span>Package picked up - New York
            </li>
            <li>
              <span className="dot yellow"></span>In transit - Chicago Hub
            </li>
            <li>
              <span className="dot gray"></span>Out for delivery - Los Angeles
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
