import React, { useEffect, useState } from "react";
import { API_URL } from "./api/api";
import {
  Package,
  Truck,
  Globe,
  MessageCircle,
  ChevronRight,
  MapPin,
  CheckCircle,
  Plane,
  Box,
  Mail,
  Phone,
  MapPinned,
  Send,
  Users,
  Target,
  Award,
  Shield,
} from "lucide-react";

// Sample shipment data - moved outside component to prevent recreation
const SAMPLE_SHIPMENTS = {
  ST123456789: {
    trackingNumber: "ST123456789",
    status: "delivered",
    origin: "Shanghai, China",
    destination: "Accra, Ghana",
    lastUpdate: "11 Oct 2025, 3:45 PM",
    estimatedDelivery: "11 Oct 2025",
    timeline: [
      {
        status: "delivered",
        location: "Accra, Ghana",
        time: "11 Oct 2025, 3:45 PM",
        icon: "check",
      },
      {
        status: "out_for_delivery",
        location: "Tema, Ghana",
        time: "11 Oct 2025, 10:00 AM",
        icon: "truck",
      },
      {
        status: "arrived_hub",
        location: "Tema, Ghana",
        time: "10 Oct 2025, 6:20 PM",
        icon: "box",
      },
      {
        status: "in_transit",
        location: "Guangzhou, China",
        time: "8 Oct 2025, 9:00 AM",
        icon: "plane",
      },
      {
        status: "created",
        location: "Shanghai, China",
        time: "6 Oct 2025, 12:15 PM",
        icon: "box",
      },
    ],
  },
};

// Navbar Component
const Navbar = ({ onNavigate, onTrackClick, setCurrentPage }) => (
  <nav className="navbar">
    <div className="container nav-content">
      <div onClick={() => setCurrentPage("landing")} className="logo">
        <Truck size={32} />
        <span>CargoExpress</span>
      </div>
      <div className="nav-links">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("landing");
          }}
        >
          Home
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("tracking");
          }}
        >
          Track Package
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("about");
          }}
        >
          About
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("contact");
          }}
        >
          Contact
        </a>
      </div>
      <button className="btn-primary" onClick={onTrackClick}>
        Track Shipment
      </button>
    </div>
  </nav>
);

// Landing Page Component
const LandingPage = ({ onTrackClick }) => (
  <>
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-left">
          <h1>Fast, Reliable Shipping & Real-Time Tracking</h1>
          <p>
            Track your packages from dispatch to delivery — anytime, anywhere.
          </p>
          <button className="btn-primary btn-large" onClick={onTrackClick}>
            Track Now <ChevronRight size={20} />
          </button>
        </div>
        <div className="hero-right">
          <div className="hero-illustration">
            <Truck size={200} strokeWidth={1} />
          </div>
        </div>
      </div>
    </section>

    <section className="features">
      <div className="container">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Package size={40} />
            </div>
            <h3>Express Delivery</h3>
            <p>Get your parcels delivered faster</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <MapPin size={40} />
            </div>
            <h3>Real-Time Tracking</h3>
            <p>See every step your shipment takes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Globe size={40} />
            </div>
            <h3>Global Coverage</h3>
            <p>We connect across continents</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <MessageCircle size={40} />
            </div>
            <h3>24/7 Support</h3>
            <p>We're always here to help</p>
          </div>
        </div>
      </div>
    </section>

    <section className="how-it-works">
      <div className="container">
        <h2>How Tracking Works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Enter Tracking Number</h3>
            <p>Input your unique tracking code</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Get Real-Time Updates</h3>
            <p>View live shipment status</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Receive Your Package</h3>
            <p>Get notified on delivery</p>
          </div>
        </div>
      </div>
    </section>

    <section className="cta-section">
      <div className="container cta-content">
        <h2>Track your shipment now and stay updated every step of the way.</h2>
        <button className="btn-secondary btn-large" onClick={onTrackClick}>
          Track Package
        </button>
      </div>
    </section>
  </>
);

// Tracking Page Component
const TrackingPage = ({
  trackingNumber,
  setTrackingNumber,
  shipmentData,
  onTrack,
  error,
  setError,
  setShipmentData,
}) => {
  const handleInputChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onTrack();
    }
  };

  useEffect(() => {
    setError(null);
    setShipmentData(null);
    setTrackingNumber("");
  }, []);

  return (
    <>
      <section className="tracking-input-section">
        <div className="container">
          {error && (
            <section className="error-section">
              <div className="container">
                <div className="error-card">
                  <Package size={48} />
                  <h3>Tracking number not found!!!</h3>
                  <p>Please check your tracking number and try again.</p>
                </div>
              </div>
            </section>
          )}
          <div className="tracking-card">
            <h2>Track Your Shipment</h2>
            <p className="tracking-subtitle">
              Enter your tracking number to get real-time updates
            </p>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter your tracking number"
                value={trackingNumber}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <button className="btn-primary" onClick={onTrack}>
                Track
              </button>
            </div>
            <p className="hint-text">Try sample: ST123456789</p>
          </div>
        </div>
      </section>

      {shipmentData && !shipmentData.error && (
        <>
          <section className="shipment-status">
            <div className="container">
              <div className="status-card">
                <div className="status-header">
                  <h3>Package Details</h3>
                  <span className={`status-badge ${shipmentData.status}`}>
                    {shipmentData.status === "delivered" && "🟢 Delivered"}
                    {shipmentData.status === "in_transit" && "🟡 In Transit"}
                    {shipmentData.status === "pending" && "🟠 Pending"}
                  </span>
                </div>
                <div className="status-details">
                  <div className="detail-item">
                    <span className="detail-label">Product Name:</span>
                    <span className="detail-value">
                      {shipmentData.productDetails.name}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Total Weight:</span>
                    <span className="detail-value">
                      {shipmentData.productDetails.weight}
                      {"kg"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Quantity:</span>
                    <span className="detail-value">
                      {shipmentData.productDetails.quantity}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Estimated Delivery:</span>
                    <span className="detail-value">
                      {shipmentData.estimatedDelivery}
                    </span>
                  </div>
                </div>
              </div>
              {/* Sender's Details */}
              <div className="status-card">
                <div className="status-header">
                  <h3>Sender's Details</h3>
                  <span className={`status-badge ${shipmentData.status}`}>
                    {shipmentData.status === "delivered" && "🟢 Delivered"}
                    {shipmentData.status === "in_transit" && "🟡 In Transit"}
                    {shipmentData.status === "pending" && "🟠 Pending"}
                  </span>
                </div>
                <div className="status-details">
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">
                      {shipmentData.sender.name}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">
                      {shipmentData.sender.email}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">
                      {shipmentData.sender.phone}
                    </span>
                  </div>
                </div>
              </div>
              {/* Recipient's Details */}
              <div className="status-card">
                <div className="status-header">
                  <h3>Recipient's Details</h3>
                  <span className={`status-badge ${shipmentData.status}`}>
                    {shipmentData.status === "delivered" && "🟢 Delivered"}
                    {shipmentData.status === "in_transit" && "🟡 In Transit"}
                    {shipmentData.status === "pending" && "🟠 Pending"}
                  </span>
                </div>
                <div className="status-details">
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">
                      {shipmentData.recipient.name}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">
                      {shipmentData.recipient.email}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">
                      {shipmentData.recipient.phone}
                    </span>
                  </div>
                </div>
              </div>
              {/* Tracking info */}
              <div className="status-card">
                <div className="status-header">
                  <h3>Tracking Number: {shipmentData.trackingNumber}</h3>
                  <span className={`status-badge ${shipmentData.status}`}>
                    {shipmentData.status === "delivered" && "🟢 Delivered"}
                    {shipmentData.status === "in_transit" && "🟡 In Transit"}
                    {shipmentData.status === "pending" && "🟠 Pending"}
                  </span>
                </div>
                <div className="status-details">
                  <div className="detail-item">
                    <span className="detail-label">Origin:</span>
                    <span className="detail-value">
                      {shipmentData.origin.city}, {shipmentData.origin.country}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Destination:</span>
                    <span className="detail-value">
                      {shipmentData.destination.city},{" "}
                      {shipmentData.destination.country}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Last Update:</span>
                    <span className="detail-value">
                      {shipmentData.lastUpdate}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Estimated Delivery:</span>
                    <span className="detail-value">
                      {shipmentData.estimatedDelivery}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="timeline-section">
            <div className="container">
              <h3>Shipment History</h3>
              <div className="timeline">
                {shipmentData.timeline.map((event, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-icon">
                      {event.icon === "check" && <CheckCircle size={24} />}
                      {event.icon === "truck" && <Truck size={24} />}
                      {event.icon === "plane" && <Plane size={24} />}
                      {event.icon === "box" && <Box size={24} />}
                    </div>
                    <div className="timeline-content">
                      <h4>
                        {event.status === "delivered" && "Delivered"}
                        {event.status === "out_for_delivery" &&
                          "Out for Delivery"}
                        {event.status === "arrived_hub" &&
                          "Arrived at Local Hub"}
                        {event.status === "in_transit" && "In Transit"}
                        {event.status === "created" && "Shipment Created"}
                      </h4>
                      <p>{event.location}</p>
                      <span className="timeline-time">{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

// About Page Component
const AboutPage = () => (
  <>
    <section className="page-hero">
      <div className="container">
        <h1>About CargoExpress</h1>
        <p>
          Leading the way in global logistics and shipment tracking solutions
        </p>
      </div>
    </section>

    <section className="about-content">
      <div className="container">
        <div className="about-intro">
          <h2>Who We Are</h2>
          <p>
            CargoExpress is a premier logistics company dedicated to providing
            seamless shipping and tracking solutions across the globe. With
            years of experience in the industry, we've built a reputation for
            reliability, speed, and customer satisfaction.
          </p>
          <p>
            Our state-of-the-art tracking technology ensures that you're always
            informed about your shipment's location and status. From small
            parcels to large cargo, we handle every delivery with the utmost
            care and professionalism.
          </p>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <Target size={48} />
            </div>
            <h3>Our Mission</h3>
            <p>
              To revolutionize global logistics by providing fast, reliable, and
              transparent shipping solutions that connect businesses and
              individuals worldwide.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <Users size={48} />
            </div>
            <h3>Our Vision</h3>
            <p>
              To be the world's most trusted logistics partner, known for
              innovation, excellence, and unwavering commitment to customer
              success.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <Award size={48} />
            </div>
            <h3>Our Values</h3>
            <p>
              Integrity, reliability, innovation, and customer-first approach
              guide everything we do. We believe in building lasting
              relationships through trust.
            </p>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <h3>500K+</h3>
            <p>Deliveries Completed</p>
          </div>
          <div className="stat-item">
            <h3>150+</h3>
            <p>Countries Covered</p>
          </div>
          <div className="stat-item">
            <h3>99.8%</h3>
            <p>On-Time Delivery</p>
          </div>
          <div className="stat-item">
            <h3>24/7</h3>
            <p>Customer Support</p>
          </div>
        </div>

        <div className="why-choose">
          <h2>Why Choose ShipTrack?</h2>
          <div className="features-list">
            <div className="feature-item">
              <Shield size={32} />
              <div>
                <h4>Secure & Insured</h4>
                <p>
                  All shipments are fully insured and handled with maximum
                  security protocols
                </p>
              </div>
            </div>
            <div className="feature-item">
              <Truck size={32} />
              <div>
                <h4>Fast Delivery</h4>
                <p>
                  Express shipping options available with guaranteed delivery
                  timelines
                </p>
              </div>
            </div>
            <div className="feature-item">
              <Globe size={32} />
              <div>
                <h4>Global Network</h4>
                <p>
                  Extensive network spanning over 150 countries and territories
                </p>
              </div>
            </div>
            <div className="feature-item">
              <MapPin size={32} />
              <div>
                <h4>Real-Time Tracking</h4>
                <p>
                  Advanced GPS tracking with live updates at every stage of
                  delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

// Contact Page Component
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    try {
      const response = await fetch("https://formspree.io/f/myznbkqj", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: "", email: "", subject: "", message: "" });
        }, 3000);
      } else {
        setStatus("Oops! There was a problem: " + (data.error || "Try again"));
      }
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to help. Get in touch with our team</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>
                Have questions about our services? Need help with tracking? Our
                customer support team is available 24/7 to assist you.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <p>+233 (0) 24 123 4567</p>
                    <p>Mon-Sun: 24/7</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>support@shiptrack.com</p>
                    <p>info@shiptrack.com</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <MapPinned size={24} />
                  </div>
                  <div>
                    <h4>Office</h4>
                    <p>123 Logistics Avenue</p>
                    <p>Accra, Ghana</p>
                  </div>
                </div>
              </div>

              <div className="business-hours">
                <h3>Business Hours</h3>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>Monday - Friday:</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Saturday:</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Sunday:</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="hours-note">
                    * Emergency support available 24/7
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Send Us a Message</h3>

                {submitted && (
                  <div className="success-message">
                    <CheckCircle size={20} />
                    <span>
                      Thank you! Your message has been sent successfully.
                    </span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="How can we help?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary btn-large">
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Footer Component
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-column">
          <h4>Company</h4>
          <a href="#about">About</a>
          <a href="#careers">Careers</a>
          <a href="#terms">Terms</a>
        </div>
        <div className="footer-column">
          <h4>Services</h4>
          <a href="#shipping">Shipping</a>
          <a href="#tracking">Tracking</a>
          <a href="#rates">Rates</a>
        </div>
        <div className="footer-column">
          <h4>Support</h4>
          <a href="#contact">Contact</a>
          <a href="#help">Help Center</a>
        </div>
        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#facebook">Facebook</a>
            <a href="#linkedin">LinkedIn</a>
            <a href="#twitter">Twitter</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 CargoExpress Logistics. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipmentData, setShipmentData] = useState(null);
  const [error, setError] = useState(null);

  // const handleTrack = () => {
  //   const trimmedNumber = trackingNumber.trim().toUpperCase();
  //   if (trimmedNumber) {
  //     const shipment = SAMPLE_SHIPMENTS[trimmedNumber];
  //     if (shipment) {
  //       setShipmentData(shipment);
  //     } else {
  //       setShipmentData({ error: "Tracking number not found" });
  //     }
  //   }
  // };

  const handleTrack = async () => {
    setShipmentData(null);
    setError(null);
    const response = await fetch(
      `${API_URL}/shipments/track/${trackingNumber}`
    );
    const result = await response.json();

    if (result.success) {
      setShipmentData(result.data);
    } else {
      setError(result.error);
    }
  };

  const handleTrackClick = () => {
    setCurrentPage("tracking");
    setShipmentData(null);
    setTrackingNumber("");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #0F172A;
          background: #F9FAFB;
        
        }

        h1, h2, h3, h4 {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
        }

        .app {
          min-height: 100vh;
        }

        .container {
          max-width: 100vw;
          margin: 0 auto;
          padding: 0 20px;
        }

        .navbar {
          background: white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 1rem 0;
          }
          
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: #004AAD;
          cursor: pointer;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-links a {
          text-decoration: none;
          color: #0F172A;
          font-weight: 500;
          position: relative;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: #004AAD;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #F2A007;
          transition: width 0.3s;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .btn-primary {
          background: #004AAD;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
        }

        .btn-primary:hover {
          background: #003580;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 74, 173, 0.3);
        }

        .btn-secondary {
          background: white;
          color: #004AAD;
          border: 2px solid white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          background: transparent;
          transform: translateY(-2px);
        }

        .btn-large {
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }

        .hero {
          padding: 5rem 0;
          background: 
            linear-gradient(135deg, rgba(1, 2, 2, 0.65) 0%, rgba(13, 35, 58, 0.6) 100%),
            url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          color: white;
          position: relative;
        }
        
        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 50%, rgba(242, 160, 7, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero h1 {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .hero p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.95;
        }

        .hero-illustration {
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0.9;
        }

        .features {
          padding: 5rem 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .feature-card {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }

        .feature-icon {
          color: #F2A007;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .feature-card p {
          color: #64748B;
        }

        .how-it-works {
          padding: 5rem 0;
          background: white;
        }

        .how-it-works h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          gap: 2rem;
          align-items: center;
        }

        .step {
          text-align: center;
        }

        .step-number {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #004AAD 0%, #0066CC 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 auto 1rem;
          box-shadow: 0 4px 12px rgba(0, 74, 173, 0.3);
        }

        .step h3 {
          margin-bottom: 0.5rem;
        }

        .step p {
          color: #64748B;
        }

        .step-connector {
          width: 80px;
          height: 2px;
          background: #E2E8F0;
        }

        .cta-section {
          padding: 5rem 0;
                    background: 
            linear-gradient(135deg, rgba(1, 2, 2, 0.65) 0%, rgba(13, 35, 58, 0.6) 100%),
            url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          color: white;
        }

        .cta-content {
          text-align: center;
        }

        .cta-content h2 {
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .tracking-input-section {
          padding: 5rem 0;
          width: 99vw;
        }

        .tracking-card {
          background: white;
          padding: 3rem;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .tracking-card h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .tracking-subtitle {
          color: #64748B;
          margin-bottom: 2rem;
        }

        .input-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .input-group input {
          flex: 1;
          padding: 1rem;
          border: 2px solid #E2E8F0;
          color: #000000;
          background-color: #ffffff;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
          font-family: 'Inter', sans-serif;
        }

        .input-group input:focus {
          outline: none;
          border-color: #004AAD;
        }

        .hint-text {
          color: #94A3B8;
          font-size: 0.875rem;
        }

        .shipment-status {
          padding: 2rem 0;
        }

        .status-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          margin-bottom: 20px;
        }

        .status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #F1F5F9;
        }

        .status-badge {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .status-badge.delivered {
          background: #D1FAE5;
          color: #065F46;
        }

        .status-badge.in_transit {
          background: #FEF3C7;
          color: #92400E;
        }

        .status-badge.pending {
          background: #FED7AA;
          color: #9A3412;
        }

        .status-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .detail-label {
          color: #64748B;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .detail-value {
          color: #0F172A;
          font-weight: 600;
        }

        .timeline-section {
          padding: 2rem 0 5rem;
        }

        .timeline-section h3 {
          font-size: 1.75rem;
          margin-bottom: 2rem;
        }

        .timeline {
          position: relative;
          padding-left: 3rem;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 12px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #E2E8F0;
        }

        .timeline-item {
          position: relative;
          padding-bottom: 2rem;
        }

        .timeline-icon {
          position: absolute;
          left: -3rem;
          width: 48px;
          height: 48px;
          background: white;
          border: 3px solid #004AAD;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #004AAD;
        }

        .timeline-content h4 {
          font-size: 1.125rem;
          margin-bottom: 0.25rem;
        }

        .timeline-content p {
          color: #64748B;
          margin-bottom: 0.25rem;
        }

        .timeline-time {
          color: #94A3B8;
          font-size: 0.875rem;
        }

        .error-section {
          padding: 3rem 0;
          margin-top: -18vh;
        }

        .error-card {
          background: white;
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          text-align: center;
          max-width: 500px;
          margin: 0 auto;
        }

        .error-card svg {
          color: #94A3B8;
          margin-bottom: 1rem;
        }

        .error-card h3 {
          margin-bottom: 0.5rem;
          color: red;
        }

        .error-card p {
          color: #64748B;
        }

        .footer {
          background: #0F172A;
          color: white;
          padding: 3rem 0 1.5rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3rem;
          margin-bottom: 2rem;
        }

        .footer-column h4 {
          margin-bottom: 1rem;
          color: #F2A007;
        }

        .footer-column a {
          display: block;
          color: #94A3B8;
          text-decoration: none;
          margin-bottom: 0.5rem;
          transition: color 0.3s;
        }

        .footer-column a:hover {
          color: white;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid #334155;
          color: #94A3B8;
        }

        .page-hero {
          padding: 4rem 0;
                    background: 
            linear-gradient(135deg, rgba(1, 2, 2, 0.65) 0%, rgba(13, 35, 58, 0.6) 100%),
            url('https://images.unsplash.com/photo-1691591765923-3bd6f12f4209?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          color: white;
          text-align: center;
        }

        .page-hero h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .page-hero p {
          font-size: 1.25rem;
          opacity: 0.9;
        }

        .about-content {
          padding: 5rem 0;
        }

        .about-intro {
          max-width: 800px;
          margin: 0 auto 4rem;
          text-align: center;
        }

        .about-intro h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: #004AAD;
        }

        .about-intro p {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #64748B;
          margin-bottom: 1rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 5rem;
        }

        .value-card {
          background: white;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          text-align: center;
        }

        .value-icon {
          color: #F2A007;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: center;
        }

        .value-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #004AAD;
        }

        .value-card p {
          color: #64748B;
          line-height: 1.6;
        }

        .stats-section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          padding: 3rem 0;
          margin-bottom: 4rem;
          background: linear-gradient(135deg, rgba(0, 74, 173, 0.05) 0%, rgba(0, 102, 204, 0.05) 100%);
          border-radius: 12px;
        }

        .stat-item {
          text-align: center;
          padding: 2rem 1rem;
        }

        .stat-item h3 {
          font-size: 2.5rem;
          color: #004AAD;
          margin-bottom: 0.5rem;
        }

        .stat-item p {
          color: #64748B;
          font-weight: 500;
        }

        .why-choose {
          max-width: 900px;
          margin: 0 auto;
        }

        .why-choose h2 {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 3rem;
          color: #004AAD;
        }

        .features-list {
          display: grid;
          gap: 2rem;
        }

        .feature-item {
          display: flex;
          gap: 1.5rem;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s;
        }

        .feature-item:hover {
          transform: translateX(10px);
        }

        .feature-item svg {
          color: #F2A007;
          flex-shrink: 0;
        }

        .feature-item h4 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: #0F172A;
        }

        .feature-item p {
          color: #64748B;
          line-height: 1.6;
        }

        .contact-content {
          padding: 5rem 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .contact-info h2 {
          font-size: 2rem;
          color: #004AAD;
          margin-bottom: 1rem;
        }

        .contact-info > p {
          color: #64748B;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .contact-method {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .method-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #004AAD 0%, #0066CC 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .contact-method h4 {
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
          color: #0F172A;
        }

        .contact-method p {
          color: #64748B;
          font-size: 0.95rem;
        }

        .business-hours {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .business-hours h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: #004AAD;
        }

        .hours-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .hours-item {
          display: flex;
          justify-content: space-between;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #E2E8F0;
        }

        .hours-item span:first-child {
          color: #0F172A;
          font-weight: 500;
        }

        .hours-item span:last-child {
          color: #64748B;
        }

        .hours-note {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 2px solid #F2A007;
          color: #F2A007;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .contact-form-wrapper {
          background: white;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .contact-form h3 {
          font-size: 1.75rem;
          margin-bottom: 1.5rem;
          color: #004AAD;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #0F172A;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.875rem;
          border: 2px solid #E2E8F0;
          border-radius: 8px;
          color: #000000;
          background-color: #ffffff;
          font-size: 1rem;
          font-family: 'Inter', sans-serif;
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #004AAD;
        }

        .form-group textarea {
          resize: vertical;
        }

        .success-message {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: #D1FAE5;
          color: #065F46;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .contact-form button[type="submit"] {
          width: 100%;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero h1 {
            font-size: 2rem;
          }

          .hero-right {
            display: none;
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .steps-grid {
            grid-template-columns: 1fr;
          }

          .step-connector {
            display: none;
          }

          .status-details {
            grid-template-columns: 1fr;
          }

          .footer-content {
            grid-template-columns: repeat(2, 1fr);
          }

          .input-group {
            flex-direction: column;
          }

          .page-hero h1 {
            font-size: 2rem;
          }

          .values-grid {
            grid-template-columns: 1fr;
          }

          .stats-section {
            grid-template-columns: repeat(2, 1fr);
          }

          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .feature-item {
            flex-direction: column;
          }
        }
      `}</style>

      <Navbar
        setCurrentPage={setCurrentPage}
        onNavigate={handleNavigate}
        onTrackClick={handleTrackClick}
      />

      {currentPage === "landing" && (
        <LandingPage onTrackClick={handleTrackClick} />
      )}
      {currentPage === "tracking" && (
        <TrackingPage
          trackingNumber={trackingNumber}
          setTrackingNumber={setTrackingNumber}
          shipmentData={shipmentData}
          onTrack={handleTrack}
          error={error}
          setError={setError}
          setShipmentData={setShipmentData}
        />
      )}
      {currentPage === "about" && <AboutPage />}
      {currentPage === "contact" && <ContactPage />}

      <Footer />
    </div>
  );
};

export default App;
