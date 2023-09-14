const rateLimit = require("express-rate-limit");

const apiRateLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes (or use the value from .env if set)
  max: process.env.RATE_LIMIT_MAX || 100, // Max requests per IP within the window (or use the value from .env if set)
  message: "Too many requests from this IP, please try again later.",
});

module.exports = {
  apiRateLimiter,
};
