import mongoose from "mongoose";
import dotenv from "dotenv";
import { sampleShipments } from "../seedData.js";
import shipmentModel from "../models/shipmentModel.js";

// Automatically seed if database is empty

dotenv.config();

// Add to server.js
const checkAndSeed = async () => {
  try {
    // Clear existing data
    await shipmentModel.deleteMany({});
    console.log("🗑️  Cleared existing shipments");
    const count = await shipmentModel.countDocuments();

    if (count === 0) {
      console.log("📦 Database is empty, seeding sample data...");

      await shipmentModel.insertMany(sampleShipments);
      console.log("✅ Sample data seeded");
    } else {
      console.log(`📦 Database has ${count} shipments`);
    }
  } catch (error) {
    console.error("Error checking/seeding database:", error);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected successfully: ${conn.connection.host}`);
    // Call after MongoDB connects
    checkAndSeed();
  } catch (error) {
    console.log(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
