import shipmentModel from "../models/shipmentModel.js";

export const trackShipment = async (req, res) => {
  try {
    const shipment = await shipmentModel.findOne({
      trackingNumber: req.params.trackingNumber.toUpperCase(),
    });

    if (!shipment) {
      return res.status(404).json({
        success: false,
        error:
          "Shipment not found. Please check your tracking number and try again.",
      });
    }

    // Return only public-facing data
    const publicData = {
      trackingNumber: shipment.trackingNumber,
      status: shipment.status,
      origin: {
        city: shipment.origin?.city,
        country: shipment.origin?.country,
      },
      productDetails: {
        name: shipment.productDetails.name,
        quantity: shipment.productDetails.quantity,
        weight: shipment.productDetails.weight,
      },
      destination: {
        city: shipment.destination?.city,
        country: shipment.destination?.country,
      },
      estimatedDelivery: shipment.estimatedDelivery,
      actualDelivery: shipment.actualDelivery,
      currentLocation: shipment.currentLocation,
      serviceType: shipment.serviceType,
      carrier: shipment.carrier,
      timeline: shipment.timeline.map((event) => ({
        status: event.status,
        location: event.location,
        time: event.time,
        icon: event.icon,
        description: event.description,
      })),
      lastUpdate:
        shipment.timeline.length > 0
          ? shipment.timeline[shipment.timeline.length - 1].time
          : shipment.createdAt,
    };

    res.json({
      success: true,
      data: publicData,
    });
  } catch (error) {
    console.error("Tracking Error:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving shipment information. Please try again later.",
    });
  }
};

export const validate = async (req, res) => {
  try {
    const trackingNumber = req.params.trackingNumber.toUpperCase();

    // Check format (ST + 5 digits)
    const isValidFormat = /^ST\d{5}$/.test(trackingNumber);

    if (!isValidFormat) {
      return res.json({
        success: true,
        valid: false,
        message:
          "Invalid tracking number format. Should be ST followed by 5 digits (e.g., ST12345)",
      });
    }

    // Check if exists in database
    const exists = await Shipment.exists({ trackingNumber });

    res.json({
      success: true,
      valid: isValidFormat,
      exists: !!exists,
      message: exists
        ? "Tracking number is valid"
        : "Tracking number format is correct but shipment not found",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error validating tracking number",
    });
  }
};
