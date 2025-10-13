import express from "express";
import { trackShipment, validate } from "../controllers/shipment.controller.js";

const router = express.Router();

router.get("/track/:trackingNumber", trackShipment);
router.get("/validate/:trackingNumber", validate);

export default router; //imported as shipmentRoutes
