// const mongoose = require("mongoose");
// const Shipment = require("./models/Shipment");
import dotenv from "dotenv";
export const sampleShipments = [
  {
    trackingNumber: "ST12345",
    status: "delivered",
    origin: {
      address: "Accra Ghana",
      city: "Accra",
      country: "Ghana",
      coordinates: { lat: 31.2304, lng: 121.4737 },
    },
    productDetails: {
      name: "Gold Bars",
      quantity: 182,
      weight: 294,
    },
    destination: {
      address: "85100 Potenza (Italia)",
      city: "Rome",
      country: "Italy",
      coordinates: { lat: 5.6037, lng: -0.187 },
    },
    sender: {
      name: "Sarah Quaye",
      email: "quayesarah75@gmail.com",
      phone: "+233-596-881-057",
    },
    recipient: {
      name: "Antonio Bonicore",
      email: "antoniobonicore@gmail.com",
      phone: "+39-329-6358-722",
    },
    packageDetails: {
      weight: 5.5,
      dimensions: { length: 40, width: 30, height: 20 },
      description: "Electronics - Laptop",
      value: 1200,
    },
    serviceType: "express",
    estimatedDelivery: new Date("2025-10-11"),
    actualDelivery: new Date("2025-10-11T15:45:00"),
    currentLocation: {
      city: "Accra",
      country: "Ghana",
      coordinates: { lat: 5.6037, lng: -0.187 },
    },
    timeline: [
      {
        status: "Delivered",
        location: "Accra, Ghana",
        time: new Date("2025-10-11T15:45:00"),
        icon: "check",
        description: "Package delivered and signed by recipient",
      },
      {
        status: "Out for Delivery",
        location: "Tema, Ghana",
        time: new Date("2025-10-11T10:00:00"),
        icon: "truck",
        description: "Package loaded on delivery vehicle",
      },
      {
        status: "Arrived at Local Hub",
        location: "London, UK",
        time: new Date("2025-10-10T18:20:00"),
        icon: "package",
        description: "Package arrived at local distribution center",
      },
      {
        status: "In Transit",
        location: "Frankfurt, Germany",
        time: new Date("2025-10-08T09:00:00"),
        icon: "plane",
        description: "Package on international flight",
      },
      {
        status: "Shipment Created",
        location: "Rome, Italy",
        time: new Date("2025-10-06T12:15:00"),
        icon: "package",
        description: "Shipment created and picked up from sender",
      },
    ],
  },
  {
    trackingNumber: "ST67890",
    status: "in-transit",
    origin: {
      address: "789 Business Park",
      city: "New York",
      country: "USA",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    destination: {
      address: "321 Commerce Street",
      city: "Lagos",
      country: "Nigeria",
      coordinates: { lat: 6.5244, lng: 3.3792 },
    },
    sender: {
      name: "Tech Solutions Inc",
      email: "shipping@techsolutions.com",
      phone: "+1-212-555-0123",
    },
    recipient: {
      name: "Adebayo Johnson",
      email: "adebayo.j@company.ng",
      phone: "+234-80-1234-5678",
    },
    packageDetails: {
      weight: 8.2,
      dimensions: { length: 50, width: 40, height: 30 },
      description: "Computer Equipment",
      value: 2500,
    },
    serviceType: "international",
    estimatedDelivery: new Date("2025-10-15"),
    currentLocation: {
      city: "London",
      country: "UK",
      coordinates: { lat: 51.5074, lng: -0.1278 },
    },
    timeline: [
      {
        status: "In Transit",
        location: "London, UK",
        time: new Date("2025-10-12T08:30:00"),
        icon: "plane",
        description: "Package in transit through international hub",
      },
      {
        status: "Departed Origin",
        location: "New York, USA",
        time: new Date("2025-10-11T14:00:00"),
        icon: "truck",
        description: "Package departed from origin facility",
      },
      {
        status: "Shipment Created",
        location: "New York, USA",
        time: new Date("2025-10-10T09:00:00"),
        icon: "package",
        description: "Shipment created and processed",
      },
    ],
  },
  {
    trackingNumber: "ST11111",
    status: "pending",
    origin: {
      address: "555 Industrial Zone",
      city: "Dubai",
      country: "UAE",
      coordinates: { lat: 25.2048, lng: 55.2708 },
    },

    destination: {
      address: "777 Residential Area",
      city: "Nairobi",
      country: "Kenya",
      coordinates: { lat: -1.2864, lng: 36.8172 },
    },
    sender: {
      name: "Dubai Export Co",
      email: "export@dubaiexport.ae",
      phone: "+971-4-123-4567",
    },
    recipient: {
      name: "Sarah Kimani",
      email: "sarah.k@email.co.ke",
      phone: "+254-700-123456",
    },
    packageDetails: {
      weight: 3.0,
      dimensions: { length: 30, width: 25, height: 15 },
      description: "Fashion Items",
      value: 450,
    },
    serviceType: "standard",
    estimatedDelivery: new Date("2025-10-18"),
    currentLocation: {
      city: "Dubai",
      country: "UAE",
      coordinates: { lat: 25.2048, lng: 55.2708 },
    },
    timeline: [
      {
        status: "Shipment Created",
        location: "Dubai, UAE",
        time: new Date("2025-10-12T10:30:00"),
        icon: "package",
        description: "Shipment created and awaiting pickup",
      },
    ],
  },
  {
    trackingNumber: "ST22222",
    status: "out-for-delivery",
    origin: {
      city: "Paris",
      country: "France",
      coordinates: { lat: 48.8566, lng: 2.3522 },
    },
    destination: {
      city: "Johannesburg",
      country: "South Africa",
      coordinates: { lat: -26.2041, lng: 28.0473 },
    },
    sender: {
      name: "Fashion House Paris",
      email: "orders@fashionhouse.fr",
      phone: "+33-1-4567-8900",
    },
    recipient: {
      name: "Thandiwe Nkosi",
      email: "thandiwe@email.co.za",
      phone: "+27-11-234-5678",
    },
    packageDetails: {
      weight: 2.5,
      dimensions: { length: 35, width: 28, height: 12 },
      description: "Clothing",
      value: 850,
    },
    serviceType: "express",
    estimatedDelivery: new Date("2025-10-13"),
    currentLocation: {
      city: "Johannesburg",
      country: "South Africa",
      coordinates: { lat: -26.2041, lng: 28.0473 },
    },
    timeline: [
      {
        status: "Out for Delivery",
        location: "Johannesburg, South Africa",
        time: new Date("2025-10-13T07:15:00"),
        icon: "truck",
        description: "Package is on the delivery vehicle",
      },
      {
        status: "Arrived at Local Facility",
        location: "Johannesburg, South Africa",
        time: new Date("2025-10-12T22:30:00"),
        icon: "warehouse",
        description: "Package arrived at local sorting facility",
      },
      {
        status: "In Transit",
        location: "Cairo, Egypt",
        time: new Date("2025-10-11T16:00:00"),
        icon: "plane",
        description: "Package in transit to destination country",
      },
      {
        status: "Departed Origin",
        location: "Paris, France",
        time: new Date("2025-10-10T11:20:00"),
        icon: "plane",
        description: "Package departed from Paris",
      },
      {
        status: "Shipment Created",
        location: "Paris, France",
        time: new Date("2025-10-09T14:45:00"),
        icon: "package",
        description: "Shipment created",
      },
    ],
  },
  {
    trackingNumber: "ST33333",
    status: "delayed",
    origin: {
      city: "Tokyo",
      country: "Japan",
      coordinates: { lat: 35.6762, lng: 139.6503 },
    },
    destination: {
      city: "Sydney",
      country: "Australia",
      coordinates: { lat: -33.8688, lng: 151.2093 },
    },
    sender: {
      name: "Tokyo Tech Corp",
      email: "shipping@tokyotech.jp",
      phone: "+81-3-1234-5678",
    },
    recipient: {
      name: "Emma Wilson",
      email: "emma.wilson@email.com.au",
      phone: "+61-2-9876-5432",
    },
    packageDetails: {
      weight: 12.0,
      dimensions: { length: 60, width: 45, height: 35 },
      description: "Industrial Equipment",
      value: 3500,
    },
    serviceType: "international",
    estimatedDelivery: new Date("2025-10-16"),
    currentLocation: {
      city: "Singapore",
      country: "Singapore",
      coordinates: { lat: 1.3521, lng: 103.8198 },
    },
    timeline: [
      {
        status: "Delayed - Customs Clearance",
        location: "Singapore",
        time: new Date("2025-10-12T14:20:00"),
        icon: "package",
        description:
          "Package delayed due to customs documentation. Expected to clear within 24-48 hours",
      },
      {
        status: "Arrived at Hub",
        location: "Singapore",
        time: new Date("2025-10-11T19:45:00"),
        icon: "warehouse",
        description: "Package arrived at Singapore hub",
      },
      {
        status: "In Transit",
        location: "Tokyo, Japan",
        time: new Date("2025-10-10T08:00:00"),
        icon: "plane",
        description: "Package departed Tokyo",
      },
      {
        status: "Shipment Created",
        location: "Tokyo, Japan",
        time: new Date("2025-10-09T12:00:00"),
        icon: "package",
        description: "Shipment created",
      },
    ],
  },
];

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(async () => {
//     console.log("✅ Connected to MongoDB");

//     // Clear existing data
//     await Shipment.deleteMany({});
//     console.log("🗑️  Cleared existing shipments");

//     // Insert sample data
//     await Shipment.insertMany(sampleShipments);
//     console.log("✅ Sample data seeded successfully");
//     console.log("\n📦 Test these tracking numbers:");
//     console.log("   - ST12345 (Delivered)");
//     console.log("   - ST67890 (In Transit)");
//     console.log("   - ST11111 (Pending)");
//     console.log("   - ST22222 (Out for Delivery)");
//     console.log("   - ST33333 (Delayed)\n");

//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error("❌ Error:", err);
//     process.exit(1);
//   });
