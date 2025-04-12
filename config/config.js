module.exports = {
  // Temperature thresholds
  temperature: {
    min: parseInt(process.env.MIN_TEMPERATURE) || 15,
    max: parseInt(process.env.MAX_TEMPERATURE) || 30
  },

  // Alert settings
  alerts: {
    email: {
      enabled: true,
      cooldown: 30 * 60 * 1000 // 30 minutes
    },
    discord: {
      enabled: true,
      cooldown: 15 * 60 * 1000 // 15 minutes
    }
  },

  // WebSocket settings
  websocket: {
    pingInterval: 25000,
    pingTimeout: 20000
  },

  // API settings
  api: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    }
  }
}; 