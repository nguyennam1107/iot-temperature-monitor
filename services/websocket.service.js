const { Server } = require('socket.io');
const { logger } = require('../utils/logger');

let io;

const initWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`);

    // Join room for specific device
    socket.on('join-device', (deviceId) => {
      socket.join(deviceId);
      logger.info(`Client ${socket.id} joined device room: ${deviceId}`);
    });

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });
};

const emitDeviceUpdate = (deviceId, data) => {
  if (io) {
    io.to(deviceId).emit('device-update', data);
    logger.info(`Emitted update for device ${deviceId}`);
  }
};

module.exports = {
  initWebSocket,
  emitDeviceUpdate
}; 