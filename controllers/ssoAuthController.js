const crypto = require("crypto");

// Demo Url
// http://localhost:5000/sso/auth/authenticate
// ?app_id=100010001000
// &redirect_url=https://localhost:3000/auth/success
// &from_url=https://localhost:3000/auth/login
// &failed_url=https://localhost:3000/auth/failed
// &secure_hash=$2a$10$R94UJRhniVMJwUohWA1JUeb22FDGJ4gz5I89DnRM2pXlbXDYDIs8a
exports.ssoAuthLogin = (req, res) => {
  const { app_id, redirect_url, from_url, failed_url, secure_hash } = req.query;
  console.log(req.query);
  const data = req.query;
  res.send(data);
};
