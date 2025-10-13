import mongoose from "mongoose";

const timelineEventSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
    },
    description: String,
    icon: {
      type: String,
      enum: ["check", "truck", "plane", "package", "warehouse"],
      default: "package",
    },
  },
  { _id: false }
);

const shipmentSchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true, // Add index for faster lookups
    },
    status: {
      type: String,
      enum: [
        "pending",
        "in-transit",
        "out-for-delivery",
        "delivered",
        "cancelled",
        "delayed",
      ],
      default: "pending",
    },
    origin: {
      address: String,
      city: String,
      country: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    productDetails: {
      name: String,
      quantity: Number,
      weight: Number,
    },
    destination: {
      address: String,
      city: String,
      country: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    sender: {
      name: String,
      email: String,
      phone: String,
    },
    recipient: {
      name: String,
      email: String,
      phone: String,
    },
    packageDetails: {
      weight: Number,
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
      },
      description: String,
      value: Number,
    },
    estimatedDelivery: Date,
    actualDelivery: Date,
    timeline: [timelineEventSchema],
    currentLocation: {
      city: String,
      country: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    carrier: {
      type: String,
      default: "ShipTrack",
    },
    serviceType: {
      type: String,
      enum: ["standard", "express", "overnight", "international"],
      default: "standard",
    },
    notes: [String],
  },
  {
    timestamps: true,
  }
);

// Generate tracking number
shipmentSchema.statics.generateTrackingNumber = function () {
  const prefix = "ST";
  const random = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${random}`;
};

const shipmentModel = mongoose.model("Shipment", shipmentSchema);
export default shipmentModel;
