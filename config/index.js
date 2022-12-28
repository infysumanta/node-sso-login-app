module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost/node-sso-login-app",
  SESSION_SECRET: process.env.SESSION_SECRET || "ThisIsSessionSecret",
  COOKIE_SECRET: process.env.COOKIE_SECRET || "ThisIsCookieSecret",
};
