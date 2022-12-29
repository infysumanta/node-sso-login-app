const { encrypt, decrypt } = require("../config/crypto");
const App = require("./../models/app.schema");

exports.ssoAuthLogin = async (req, res) => {
  // res.json(req.apps);
  res.render("sso/success", { layout: "sso/layout", apps: req.apps });
  // res.render("sso/failure", { layout: "sso/layout", apps: req.apps });
};

exports.testSSOAuthLogin = async (req, res) => {
  // http://localhost:5000/sso/auth/authenticate?app_id=63ac989b3a899011c0b2b0be&redirect_url=https://localhost:3000/auth/success&from_url=https://localhost:3000/auth/login&failed_url=https://localhost:3000/auth/failed&secure_hash=$2a$10$R94UJRhniVMJwUohWA1JUeb22FDGJ4gz5I89DnRM2pXlbXDYDIs8a
  // Demo Url
  // http://localhost:5000/sso/auth/authenticate
  // ?app_id=63ac989b3a899011c0b2b0be
  // &redirect_url=https://localhost:3000/auth/success
  // &from_url=https://localhost:3000/auth/login
  // &failed_url=https://localhost:3000/auth/failed
  // &secure_hash=$2a$10$R94UJRhniVMJwUohWA1JUeb22FDGJ4gz5I89DnRM2pXlbXDYDIs8a

  const baseUrl = "http://localhost:5000/sso/auth/authenticate";
  const app_id = "63ac989b3a899011c0b2b0be";
  const app_secret = "efa517af-361a-4215-bd8d-58929dbf5917";
  const redirect_url = "https://localhost:3000/auth/success";
  const from_url = "https://localhost:3000/auth/login";
  const failed_url = "https://localhost:3000/auth/failed";
  let data = {
    app_id: app_id,
    date: new Date(),
  };
  const encryptor = encrypt(app_secret);
  const secure_hash = encryptor(JSON.stringify(data));

  const fullUrl = `${baseUrl}?app_id=${app_id}&redirect_url=${redirect_url}&from_url=${from_url}&failed_url=${failed_url}&secure_hash=${secure_hash}`;

  // res.send(secure_hash);
  res.redirect(fullUrl);
};
