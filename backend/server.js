import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
const allowedOrigins = [
  "https://cargo-express-two.vercel.app/",
  "http://localhost:5173",
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/shipments", shipmentRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "ShipTrack API is running" });
});

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
  connectDB();
});
