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
  Languages,
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

// Translation dictionary
const TRANSLATIONS = {
  en: {
    // Navbar
    home: "Home",
    trackPackage: "Track Package",
    about: "About",
    contact: "Contact",
    trackShipment: "Track Shipment",

    // Landing Page
    title: "Fast, Reliable Shipping & Real-Time Tracking",
    subtitle:
      "Track your packages from dispatch to delivery — anytime, anywhere.",
    trackNow: "Track Now",
    expressDelivery: "Express Delivery",
    expressDesc: "Get your parcels delivered faster",
    realTimeTracking: "Real-Time Tracking",
    realTimeDesc: "See every step your shipment takes",
    globalCoverage: "Global Coverage",
    globalDesc: "We connect across continents",
    support: "24/7 Support",
    supportDesc: "We're always here to help",
    howItWorks: "How Tracking Works",
    step1: "Enter Tracking Number",
    step1Desc: "Input your unique tracking code",
    step2: "Get Real-Time Updates",
    step2Desc: "View live shipment status",
    step3: "Receive Your Package",
    step3Desc: "Get notified on delivery",
    ctaTitle: "Track your shipment now and stay updated every step of the way.",
    ctaButton: "Track Package",

    // Tracking Page
    trackYourShipment: "Track Your Shipment",
    enterTrackingNumber: "Enter your tracking number to get real-time updates",
    placeholder: "Enter your tracking number",
    track: "Track",
    trySample: "Try sample: ST123456789",
    trackingNotFound: "Tracking number not found!!!",
    checkNumber: "Please check your tracking number and try again.",
    packageDetails: "Package Details",
    productName: "Product Name:",
    totalWeight: "Total Weight:",
    quantity: "Quantity:",
    estimatedDelivery: "Estimated Delivery:",
    sendersDetails: "Sender's Details",
    recipientsDetails: "Recipient's Details",
    name: "Name:",
    email: "Email:",
    phone: "Phone:",
    origin: "Origin:",
    destination: "Destination:",
    lastUpdate: "Last Update:",
    shipmentHistory: "Shipment History",
    delivered: "Delivered",
    outForDelivery: "Out for Delivery",
    arrivedHub: "Arrived at Local Hub",
    inTransit: "In Transit",
    shipmentCreated: "Shipment Created",

    // About Page
    aboutTitle: "About CargoExpress",
    aboutSubtitle:
      "Leading the way in global logistics and shipment tracking solutions",
    whoWeAre: "Who We Are",
    aboutText1:
      "CargoExpress is a premier logistics company dedicated to providing seamless shipping and tracking solutions across the globe. With years of experience in the industry, we've built a reputation for reliability, speed, and customer satisfaction.",
    aboutText2:
      "Our state-of-the-art tracking technology ensures that you're always informed about your shipment's location and status. From small parcels to large cargo, we handle every delivery with the utmost care and professionalism.",
    ourMission: "Our Mission",
    missionText:
      "To revolutionize global logistics by providing fast, reliable, and transparent shipping solutions that connect businesses and individuals worldwide.",
    ourVision: "Our Vision",
    visionText:
      "To be the world's most trusted logistics partner, known for innovation, excellence, and unwavering commitment to customer success.",
    ourValues: "Our Values",
    valuesText:
      "Integrity, reliability, innovation, and customer-first approach guide everything we do. We believe in building lasting relationships through trust.",
    deliveriesCompleted: "Deliveries Completed",
    countriesCovered: "Countries Covered",
    onTimeDelivery: "On-Time Delivery",
    customerSupport: "Customer Support",
    whyChoose: "Why Choose CargoExpress?",
    secureInsured: "Secure & Insured",
    secureDesc:
      "All shipments are fully insured and handled with maximum security protocols",
    fastDelivery: "Fast Delivery",
    fastDesc:
      "Express shipping options available with guaranteed delivery timelines",
    globalNetwork: "Global Network",
    globalNetworkDesc:
      "Extensive network spanning over 150 countries and territories",
    realTimeTrackingAbout: "Real-Time Tracking",
    realTimeDescAbout:
      "Advanced GPS tracking with live updates at every stage of delivery",

    // Contact Page
    contactTitle: "Contact Us",
    contactSubtitle: "We're here to help. Get in touch with our team",
    getInTouch: "Get In Touch",
    contactDesc:
      "Have questions about our services? Need help with tracking? Our customer support team is available 24/7 to assist you.",
    phone: "Phone",
    email: "Email",
    office: "Office",
    businessHours: "Business Hours",
    mondayFriday: "Monday - Friday:",
    saturday: "Saturday:",
    sunday: "Sunday:",
    emergencySupport: "* Emergency support available 24/7",
    sendMessage: "Send Us a Message",
    thankYou: "Thank you! Your message has been sent successfully.",
    fullName: "Full Name *",
    emailAddress: "Email Address *",
    subject: "Subject *",
    message: "Message *",
    howCanWeHelp: "How can we help?",
    tellUsMore: "Tell us more about your inquiry...",
    sendMessageButton: "Send Message",

    // Footer
    company: "Company",
    careers: "Careers",
    terms: "Terms",
    services: "Services",
    shipping: "Shipping",
    tracking: "Tracking",
    rates: "Rates",
    support: "Support",
    helpCenter: "Help Center",
    followUs: "Follow Us",
    rights: "© 2025 CargoExpress Logistics. All rights reserved.",
  },
  it: {
    // Navbar
    home: "Home",
    trackPackage: "Traccia Pacco",
    about: "Chi Siamo",
    contact: "Contatti",
    trackShipment: "Traccia Spedizione",

    // Landing Page
    title: "Spedizioni Veloci, Affidabili e Tracciamento in Tempo Reale",
    subtitle:
      "Traccia i tuoi pacchi dalla partenza alla consegna — sempre e ovunque.",
    trackNow: "Traccia Ora",
    expressDelivery: "Consegna Espressa",
    expressDesc: "Ricevi i tuoi pacchi più velocemente",
    realTimeTracking: "Tracciamento in Tempo Reale",
    realTimeDesc: "Segui ogni passo della tua spedizione",
    globalCoverage: "Copertura Globale",
    globalDesc: "Colleghiamo i continenti",
    support: "Supporto 24/7",
    supportDesc: "Siamo sempre qui per aiutarti",
    howItWorks: "Come Funziona il Tracciamento",
    step1: "Inserisci Numero di Tracciamento",
    step1Desc: "Inserisci il tuo codice di tracciamento univoco",
    step2: "Ricevi Aggiornamenti in Tempo Reale",
    step2Desc: "Visualizza lo stato della spedizione in diretta",
    step3: "Ricevi il Tuo Pacco",
    step3Desc: "Ricevi notifica alla consegna",
    ctaTitle:
      "Traccia la tua spedizione ora e rimani aggiornato ad ogni passo.",
    ctaButton: "Traccia Pacco",

    // Tracking Page
    trackYourShipment: "Traccia la Tua Spedizione",
    enterTrackingNumber:
      "Inserisci il tuo numero di tracciamento per aggiornamenti in tempo reale",
    placeholder: "Inserisci il tuo numero di tracciamento",
    track: "Traccia",
    trySample: "Prova esempio: ST123456789",
    trackingNotFound: "Numero di tracciamento non trovato!!!",
    checkNumber: "Controlla il tuo numero di tracciamento e riprova.",
    packageDetails: "Dettagli Pacco",
    productName: "Nome Prodotto:",
    totalWeight: "Peso Totale:",
    quantity: "Quantità:",
    estimatedDelivery: "Consegna Stimata:",
    sendersDetails: "Dettagli Mittente",
    recipientsDetails: "Dettagli Destinatario",
    name: "Nome:",
    email: "Email:",
    phone: "Telefono:",
    origin: "Origine:",
    destination: "Destinazione:",
    lastUpdate: "Ultimo Aggiornamento:",
    shipmentHistory: "Cronologia Spedizione",
    delivered: "Consegnato",
    outForDelivery: "In Consegna",
    arrivedHub: "Arrivato all'Hub Locale",
    inTransit: "In Transito",
    shipmentCreated: "Spedizione Creata",

    // About Page
    aboutTitle: "Chi Siamo - CargoExpress",
    aboutSubtitle:
      "All'avanguardia nelle soluzioni logistiche globali e nel tracciamento delle spedizioni",
    whoWeAre: "Chi Siamo",
    aboutText1:
      "CargoExpress è una società logistica di primo livello dedicata a fornire soluzioni di spedizione e tracciamento senza soluzione di continuità in tutto il mondo. Con anni di esperienza nel settore, ci siamo guadagnati una reputazione per affidabilità, velocità e soddisfazione del cliente.",
    aboutText2:
      "La nostra tecnologia di tracciamento all'avanguardia garantisce che tu sia sempre informato sulla posizione e lo stato della tua spedizione. Dai piccoli pacchi ai carichi voluminosi, gestiamo ogni consegna con la massima cura e professionalità.",
    ourMission: "La Nostra Missione",
    missionText:
      "Rivoluzionare la logistica globale fornendo soluzioni di spedizione veloci, affidabili e trasparenti che collegano aziende e privati in tutto il mondo.",
    ourVision: "La Nostra Visione",
    visionText:
      "Essere il partner logistico più affidabile al mondo, noto per innovazione, eccellenza e impegno incrollabile per il successo del cliente.",
    ourValues: "I Nostri Valori",
    valuesText:
      "Integrità, affidabilità, innovazione e approccio customer-first guidano tutto ciò che facciamo. Crediamo nella costruzione di relazioni durature attraverso la fiducia.",
    deliveriesCompleted: "Consegne Completate",
    countriesCovered: "Paesi Coperti",
    onTimeDelivery: "Consegne Puntuali",
    customerSupport: "Supporto Clienti",
    whyChoose: "Perché Scegliere CargoExpress?",
    secureInsured: "Sicuro e Assicurato",
    secureDesc:
      "Tutte le spedizioni sono completamente assicurate e gestite con protocolli di sicurezza massimi",
    fastDelivery: "Consegna Veloce",
    fastDesc:
      "Opzioni di spedizione espressa disponibili con tempi di consegna garantiti",
    globalNetwork: "Rete Globale",
    globalNetworkDesc: "Rete estesa che copre oltre 150 paesi e territori",
    realTimeTrackingAbout: "Tracciamento in Tempo Reale",
    realTimeDescAbout:
      "Tracciamento GPS avanzato con aggiornamenti in tempo reale ad ogni fase della consegna",

    // Contact Page
    contactTitle: "Contattaci",
    contactSubtitle:
      "Siamo qui per aiutarti. Mettiti in contatto con il nostro team",
    getInTouch: "Mettiti in Contatto",
    contactDesc:
      "Hai domande sui nostri servizi? Hai bisogno di aiuto con il tracciamento? Il nostro team di supporto clienti è disponibile 24/7 per assisterti.",
    phone: "Telefono",
    email: "Email",
    office: "Ufficio",
    businessHours: "Orari di Lavoro",
    mondayFriday: "Lunedì - Venerdì:",
    saturday: "Sabato:",
    sunday: "Domenica:",
    emergencySupport: "* Supporto di emergenza disponibile 24/7",
    sendMessage: "Inviaci un Messaggio",
    thankYou: "Grazie! Il tuo messaggio è stato inviato con successo.",
    fullName: "Nome Completo *",
    emailAddress: "Indirizzo Email *",
    subject: "Oggetto *",
    message: "Messaggio *",
    howCanWeHelp: "Come possiamo aiutarti?",
    tellUsMore: "Raccontaci di più sulla tua richiesta...",
    sendMessageButton: "Invia Messaggio",

    // Footer
    company: "Azienda",
    careers: "Carriere",
    terms: "Termini",
    services: "Servizi",
    shipping: "Spedizioni",
    tracking: "Tracciamento",
    rates: "Tariffe",
    support: "Supporto",
    helpCenter: "Centro Assistenza",
    followUs: "Seguici",
    rights: "© 2025 CargoExpress Logistics. Tutti i diritti riservati.",
  },
};

// Translation hook
const useTranslation = (language) => {
  const getTranslation = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS["en"][key] || key;
  };

  const translateContent = (contentObject) => {
    const translated = {};
    for (const [key, value] of Object.entries(contentObject)) {
      translated[key] = getTranslation(value);
    }
    return translated;
  };

  return { getTranslation, translateContent };
};

// Language Selector Component
const LanguageSelector = ({ currentLanguage, onLanguageChange }) => (
  <div className="language-selector">
    <Languages size={20} />
    <select
      value={currentLanguage}
      onChange={(e) => onLanguageChange(e.target.value)}
      className="language-dropdown"
    >
      <option value="en">English</option>
      <option value="it">Italiano</option>
    </select>
  </div>
);

// Navbar Component
const Navbar = ({
  onNavigate,
  onTrackClick,
  setCurrentPage,
  currentLanguage,
  onLanguageChange,
}) => {
  const { getTranslation } = useTranslation(currentLanguage);

  return (
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
            {getTranslation("home")}
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("tracking");
            }}
          >
            {getTranslation("trackPackage")}
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("about");
            }}
          >
            {getTranslation("about")}
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("contact");
            }}
          >
            {getTranslation("contact")}
          </a>
        </div>
        <div className="nav-actions">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />
          <button className="btn-primary" onClick={onTrackClick}>
            {getTranslation("trackShipment")}
          </button>
        </div>
      </div>
    </nav>
  );
};

// Landing Page Component
const LandingPage = ({ onTrackClick, currentLanguage }) => {
  const { getTranslation } = useTranslation(currentLanguage);

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-left">
            <h1>{getTranslation("title")}</h1>
            <p>{getTranslation("subtitle")}</p>
            <button className="btn-primary btn-large" onClick={onTrackClick}>
              {getTranslation("trackNow")} <ChevronRight size={20} />
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
              <h3>{getTranslation("expressDelivery")}</h3>
              <p>{getTranslation("expressDesc")}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <MapPin size={40} />
              </div>
              <h3>{getTranslation("realTimeTracking")}</h3>
              <p>{getTranslation("realTimeDesc")}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Globe size={40} />
              </div>
              <h3>{getTranslation("globalCoverage")}</h3>
              <p>{getTranslation("globalDesc")}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <MessageCircle size={40} />
              </div>
              <h3>{getTranslation("support")}</h3>
              <p>{getTranslation("supportDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>{getTranslation("howItWorks")}</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>{getTranslation("step1")}</h3>
              <p>{getTranslation("step1Desc")}</p>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>{getTranslation("step2")}</h3>
              <p>{getTranslation("step2Desc")}</p>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>{getTranslation("step3")}</h3>
              <p>{getTranslation("step3Desc")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-content">
          <h2>{getTranslation("ctaTitle")}</h2>
          <button className="btn-secondary btn-large" onClick={onTrackClick}>
            {getTranslation("ctaButton")}
          </button>
        </div>
      </section>
    </>
  );
};

// Tracking Page Component
const TrackingPage = ({
  trackingNumber,
  setTrackingNumber,
  shipmentData,
  onTrack,
  error,
  setError,
  setShipmentData,
  currentLanguage,
}) => {
  const { getTranslation } = useTranslation(currentLanguage);

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
                  <h3>{getTranslation("trackingNotFound")}</h3>
                  <p>{getTranslation("checkNumber")}</p>
                </div>
              </div>
            </section>
          )}
          <div className="tracking-card">
            <h2>{getTranslation("trackYourShipment")}</h2>
            <p className="tracking-subtitle">
              {getTranslation("enterTrackingNumber")}
            </p>
            <div className="input-group">
              <input
                type="text"
                placeholder={getTranslation("placeholder")}
                value={trackingNumber}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <button className="btn-primary" onClick={onTrack}>
                {getTranslation("track")}
              </button>
            </div>
            <p className="hint-text">{getTranslation("trySample")}</p>
          </div>
        </div>
      </section>

      {shipmentData && !shipmentData.error && (
        <>
          <section className="shipment-status">
            <div className="container">
              <div className="status-card">
                <div className="status-header">
                  <h3>{getTranslation("packageDetails")}</h3>
                  <span className={`status-badge ${shipmentData.status}`}>
                    {shipmentData.status === "delivered" &&
                      "🟢 " + getTranslation("delivered")}
                    {shipmentData.status === "in-transit" &&
                      "🟡 " + getTranslation("inTransit")}
                    {shipmentData.status === "pending" && "🟠 Pending"}
                  </span>
                </div>
                <div className="status-details">
                  <div className="detail-item">
                    <span className="detail-label">
                      {getTranslation("productName")}
                    </span>
                    <span className="detail-value">
                      {shipmentData.productDetails?.name || "Electronics"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      {getTranslation("totalWeight")}
                    </span>
                    <span className="detail-value">
                      {shipmentData.productDetails?.weight || "2.5"}
                      {"kg"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      {getTranslation("quantity")}
                    </span>
                    <span className="detail-value">
                      {shipmentData.productDetails?.quantity || "1"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      {getTranslation("estimatedDelivery")}
                    </span>
                    <span className="detail-value">
                      {shipmentData.estimatedDelivery}
                    </span>
                  </div>
                </div>
              </div>

              <div className="status-card">
                <div className="status-header">
                  <h3>{getTranslation("sendersDetails")}</h3>
                  <span className={`status-badge ${shipmentData.status}`}>
                    {shipmentData.status === "delivered" &&
                      "🟢 " + getTranslation("delivered")}
                    {shipmentData.status === "in_transit" &&
                      "🟡 " + getTranslation("inTransit")}
                    {shipmentData.status === "pending" && "🟠 Pending"}
                  </span>
                </div>
                <div className="status-details">
                  <div className="detail-item">
                    <span className="detail-label">
                      {getTranslation("name")}
                    </span>
                    <span className="detail-value">
                      {shipmentData.sender?.name || "Zhang Wei"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      {getTranslation("email")}
                    </span>
                    <span className="detail-value">
                      {shipmentData.sender?.email || "zhang.wei@example.com"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      {getTranslation("phone")}
                    </span>
                    <span className="detail-value">
                      {shipmentData.sender?.phone || "+86 138 0013 8000"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="status-card">
                <div className="status-header">
                  <h3>{getTranslation("recipientsDetails")}</h3>
                  <span className={`status-badge ${shipmentData.status}`}>
                    {shipmentData.status === "delivered" &&
                      "🟢 " + getTranslation("delivered")}
                    {shipmentData.status === "in_transit" &&
                      "🟡 " + getTranslation("inTransit")}
                    {shipmentData.status === "pending" && "🟠 Pending"}
                  </span>
                </div>
                <div className="status-details">
                  <div className="detail-item">
                    <span className="detail-label">
                      {getTranslation("name")}
                    </span>
                    <span className="detail-value">
                      {shipmentData.recipient?.name || "Kwame Mensah"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      {getTranslation("email")}
                    </span>
                    <span className="detail-value">
                      {shipmentData.recipient?.email ||
                        "kwame.mensah@example.com"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      {getTranslation("phone")}
                    </span>
                    <span className="detail-value">
                      {shipmentData.recipient?.phone || "+233 24 123 4567"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="status-card">
                <div className="status-header">
                  <h3>Tracking Number: {shipmentData.trackingNumber}</h3>
                  <span className={`status-badge ${shipmentData.status}`}>
                    {shipmentData.status === "delivered" &&
                      "🟢 " + getTranslation("delivered")}
                    {shipmentData.status === "in_transit" &&
                      "🟡 " + getTranslation("inTransit")}
                    {shipmentData.status === "pending" && "🟠 Pending"}
                  </span>
                </div>
                <div className="status-details">
                  <div className="detail-item">
                    <span className="detail-label">
                      {getTranslation("origin")}
                    </span>
                    <span className="detail-value">
                      {shipmentData.origin?.city || "Shanghai"},{" "}
                      {shipmentData.origin?.country || "China"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      {getTranslation("destination")}
                    </span>
                    <span className="detail-value">
                      {shipmentData.destination?.city || "Accra"},{" "}
                      {shipmentData.destination?.country || "Ghana"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      {getTranslation("lastUpdate")}
                    </span>
                    <span className="detail-value">
                      {shipmentData.lastUpdate}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      {getTranslation("estimatedDelivery")}
                    </span>
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
              <h3>{getTranslation("shipmentHistory")}</h3>
              <div className="timeline">
                {shipmentData.timeline?.map((event, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-icon">
                      {event.icon === "check" && <CheckCircle size={24} />}
                      {event.icon === "truck" && <Truck size={24} />}
                      {event.icon === "plane" && <Plane size={24} />}
                      {event.icon === "box" && <Box size={24} />}
                    </div>
                    <div className="timeline-content">
                      <h4>
                        {event.status === "delivered" &&
                          getTranslation("delivered")}
                        {event.status === "out_for_delivery" &&
                          getTranslation("outForDelivery")}
                        {event.status === "arrived_hub" &&
                          getTranslation("arrivedHub")}
                        {event.status === "in_transit" &&
                          getTranslation("inTransit")}
                        {event.status === "created" &&
                          getTranslation("shipmentCreated")}
                      </h4>
                      <p>{event.location}</p>
                      <span className="timeline-time">{event.time}</span>
                    </div>
                    {event.status === "In-transit" && <span>🟠</span>}
                    {event.status === "Delivered" && <span>🟢</span>}
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
const AboutPage = ({ currentLanguage }) => {
  const { getTranslation } = useTranslation(currentLanguage);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{getTranslation("aboutTitle")}</h1>
          <p>{getTranslation("aboutSubtitle")}</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-intro">
            <h2>{getTranslation("whoWeAre")}</h2>
            <p>{getTranslation("aboutText1")}</p>
            <p>{getTranslation("aboutText2")}</p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Target size={48} />
              </div>
              <h3>{getTranslation("ourMission")}</h3>
              <p>{getTranslation("missionText")}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Users size={48} />
              </div>
              <h3>{getTranslation("ourVision")}</h3>
              <p>{getTranslation("visionText")}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Award size={48} />
              </div>
              <h3>{getTranslation("ourValues")}</h3>
              <p>{getTranslation("valuesText")}</p>
            </div>
          </div>

          <div className="stats-section">
            <div className="stat-item">
              <h3>500K+</h3>
              <p>{getTranslation("deliveriesCompleted")}</p>
            </div>
            <div className="stat-item">
              <h3>150+</h3>
              <p>{getTranslation("countriesCovered")}</p>
            </div>
            <div className="stat-item">
              <h3>99.8%</h3>
              <p>{getTranslation("onTimeDelivery")}</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>{getTranslation("customerSupport")}</p>
            </div>
          </div>

          <div className="why-choose">
            <h2>{getTranslation("whyChoose")}</h2>
            <div className="features-list">
              <div className="feature-item">
                <Shield size={32} />
                <div>
                  <h4>{getTranslation("secureInsured")}</h4>
                  <p>{getTranslation("secureDesc")}</p>
                </div>
              </div>
              <div className="feature-item">
                <Truck size={32} />
                <div>
                  <h4>{getTranslation("fastDelivery")}</h4>
                  <p>{getTranslation("fastDesc")}</p>
                </div>
              </div>
              <div className="feature-item">
                <Globe size={32} />
                <div>
                  <h4>{getTranslation("globalNetwork")}</h4>
                  <p>{getTranslation("globalNetworkDesc")}</p>
                </div>
              </div>
              <div className="feature-item">
                <MapPin size={32} />
                <div>
                  <h4>{getTranslation("realTimeTrackingAbout")}</h4>
                  <p>{getTranslation("realTimeDescAbout")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Contact Page Component
const ContactPage = ({ currentLanguage }) => {
  const { getTranslation } = useTranslation(currentLanguage);
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
      }
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{getTranslation("contactTitle")}</h1>
          <p>{getTranslation("contactSubtitle")}</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>{getTranslation("getInTouch")}</h2>
              <p>{getTranslation("contactDesc")}</p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4>{getTranslation("phone")}</h4>
                    <p>+233 (0) 24 123 4567</p>
                    <p>Mon-Sun: 24/7</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4>{getTranslation("email")}</h4>
                    <p>support@cargoexpress.com</p>
                    <p>info@cargoexpress.com</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <MapPinned size={24} />
                  </div>
                  <div>
                    <h4>{getTranslation("office")}</h4>
                    <p>123 Logistics Avenue</p>
                    <p>Accra, Ghana</p>
                  </div>
                </div>
              </div>

              <div className="business-hours">
                <h3>{getTranslation("businessHours")}</h3>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>{getTranslation("mondayFriday")}</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>{getTranslation("saturday")}</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>{getTranslation("sunday")}</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="hours-note">
                    {getTranslation("emergencySupport")}
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>{getTranslation("sendMessage")}</h3>

                {submitted && (
                  <div className="success-message">
                    <CheckCircle size={20} />
                    <span>{getTranslation("thankYou")}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">{getTranslation("fullName")}</label>
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
                  <label htmlFor="email">
                    {getTranslation("emailAddress")}
                  </label>
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
                  <label htmlFor="subject">{getTranslation("subject")}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder={getTranslation("howCanWeHelp")}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">{getTranslation("message")}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder={getTranslation("tellUsMore")}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary btn-large">
                  <Send size={20} />
                  {getTranslation("sendMessageButton")}
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
const Footer = ({ currentLanguage }) => {
  const { getTranslation } = useTranslation(currentLanguage);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h4>{getTranslation("company")}</h4>
            <a href="#about">{getTranslation("about")}</a>
            <a href="#careers">{getTranslation("careers")}</a>
            <a href="#terms">{getTranslation("terms")}</a>
          </div>
          <div className="footer-column">
            <h4>{getTranslation("services")}</h4>
            <a href="#shipping">{getTranslation("shipping")}</a>
            <a href="#tracking">{getTranslation("tracking")}</a>
            <a href="#rates">{getTranslation("rates")}</a>
          </div>
          <div className="footer-column">
            <h4>{getTranslation("support")}</h4>
            <a href="#contact">{getTranslation("contact")}</a>
            <a href="#help">{getTranslation("helpCenter")}</a>
          </div>
          <div className="footer-column">
            <h4>{getTranslation("followUs")}</h4>
            <div className="social-links">
              <a href="#facebook">Facebook</a>
              <a href="#linkedin">LinkedIn</a>
              <a href="#twitter">Twitter</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{getTranslation("rights")}</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipmentData, setShipmentData] = useState(null);
  const [error, setError] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("en");

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

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .language-selector {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: 6px;
          border: 1px solid #E2E8F0;
          background: white;
        }

        .language-dropdown {
          border: none;
          background: transparent;
          color: #0F172A;
          font-size: 0.875rem;
          cursor: pointer;
          outline: none;
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

          .nav-actions {
            flex-direction: column;
            gap: 0.5rem;
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
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {currentPage === "landing" && (
        <LandingPage
          onTrackClick={handleTrackClick}
          currentLanguage={currentLanguage}
        />
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
          currentLanguage={currentLanguage}
        />
      )}
      {currentPage === "about" && (
        <AboutPage currentLanguage={currentLanguage} />
      )}
      {currentPage === "contact" && (
        <ContactPage currentLanguage={currentLanguage} />
      )}

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default App;
