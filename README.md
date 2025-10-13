// ==================== README.md ====================
// Documentation for the API

/\*

# ShipTrack Backend - Public Tracking Only

## Overview

Simple, read-only API for tracking shipments. No authentication required.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create .env file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shiptrack
NODE_ENV=production
```

3. Seed database with sample data:

```bash
npm run seed
```

4. Start server:

```bash
npm start          # Production
npm run dev        # Development with nodemon
```

## API Endpoints

### Track Shipment

```
GET /api/shipments/track/:trackingNumber
```

**Example:**

```bash
curl http://localhost:5000/api/shipments/track/ST12345
```

**Response:**

```json
{
  "success": true,
  "data": {
    "trackingNumber": "ST12345",
    "status": "delivered",
    "origin": {
      "city": "Shanghai",
      "country": "China"
    },
    "destination": {
      "city": "Accra",
      "country": "Ghana"
    },
    "timeline": [
      {
        "status": "Delivered",
        "location": "Accra, Ghana",
        "time": "2025-10-11T15:45:00.000Z",
        "icon": "check"
      }
    ]
  }
}
```

### Validate Tracking Number

```
GET /api/shipments/validate/:trackingNumber
```

## Adding New Shipments

Since this is read-only, add shipments directly to MongoDB:

1. Use MongoDB Compass or CLI
2. Or modify seedData.js and run `npm run seed`
3. Or use a separate admin tool/script

## Frontend Integration

```javascript
const API_URL = "http://localhost:5000/api";

async function trackShipment(trackingNumber) {
  const response = await fetch(`${API_URL}/shipments/track/${trackingNumber}`);
  const data = await response.json();

  if (data.success) {
    console.log(data.data);
  }
}
```

\*/
