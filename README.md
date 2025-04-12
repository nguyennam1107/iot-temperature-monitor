# IoT Temperature Monitoring Backend

A Node.js backend for monitoring temperature and humidity data from ESP32 devices.

## Features

- Real-time temperature and humidity monitoring
- WebSocket support for live updates
- Email and Discord alerts for temperature thresholds
- User authentication and device management
- RESTful API for device control
- MongoDB database for data storage
- Logging system with Winston

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Gmail account (for email alerts)
- Discord webhook URL (for Discord alerts)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/nguyennam1107/iot-temperature-monitor.git
cd iot-temperature-monitor/Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/iot-temperature-monitor
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
DISCORD_WEBHOOK_URL=your_discord_webhook_url
MIN_TEMPERATURE=15
MAX_TEMPERATURE=30
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Device Management

- `POST /api/devices` - Create a new device
- `POST /api/devices/update` - Update device data (from ESP32)
- `GET /api/devices` - Get all devices for a user
- `GET /api/devices/:id` - Get device by ID

## WebSocket Events

- `join-device` - Join a device room
- `device-update` - Receive device updates

## Project Structure

```
├── server.js                     # Entry point
├── .env                          # Environment variables
├── package.json
│
├── config/
│   └── config.js                 # System configuration
│
├── routes/
│   ├── auth.route.js             # Authentication routes
│   ├── user.route.js             # User management routes
│   ├── device.route.js           # Device management routes
│
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── device.controller.js      # Device data handling
│
├── models/
│   ├── user.model.js
│   ├── device.model.js           # Device data schema
│
├── middleware/
│   ├── auth.middleware.js        # JWT authentication
│   └── validate.middleware.js    # Request validation
│
├── services/
│   ├── mail.service.js           # Email alerts
│   ├── discord.service.js        # Discord alerts
│   ├── websocket.service.js      # WebSocket server
│
├── utils/
│   ├── logger.js                 # Logging system
│   ├── average.js                # Temperature calculations
│
├── database/
│   ├── db.js                     # MongoDB connection
│   └── migrations.js             # Initial data setup
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
