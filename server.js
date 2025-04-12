require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { logger } = require('./utils/logger');
const { initWebSocket } = require('./services/websocket.service');
const { connectDB } = require('./database/db');

// Import routes
const authRoutes = require('./routes/auth.route');
const deviceRoutes = require('./routes/device.route');
const readingRoutes = require('./routes/reading.route');
const alertRoutes = require('./routes/alert.route');
const userRoutes = require('./routes/user.route');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/readings', readingRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/users',userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to database and start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });

    // Initialize WebSocket
    initWebSocket(server);
  })
  .catch((err) => {
    logger.error('Database connection error:', err);
    process.exit(1);
  }); 