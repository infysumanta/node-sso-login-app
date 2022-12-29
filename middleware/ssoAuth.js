const { encrypt, decrypt } = require("../config/crypto");
const App = require("./../models/app.schema");

const ssoAuth = async (req, res, next) => {
  try {
    const { app_id, redirect_url, from_url, failed_url, secure_hash } =
      req.query;

    if (!app_id) {
      return res.json({
        success: false,
        message: "The App ID is not exist",
      });
    }
    if (!redirect_url) {
      return res.json({
        success: false,
        message: "Redirect Url is not exist",
      });
    }
    if (!from_url) {
      return res.json({
        success: false,
        message: "From Url is not exist",
      });
    }
    if (!failed_url) {
      return res.json({
        success: false,
        message: "Failed Url is not exist",
      });
    }
    if (!secure_hash) {
      return res.json({
        success: false,
        message: "Secure Hash is not exist",
      });
    }

    const app = await App.findById(app_id);
    const decryptor = decrypt(app.app_secret);
    const hasData = JSON.parse(decryptor(secure_hash));
    if (app.id !== hasData.app_id) {
      return res.json({
        success: false,
        message: "The App is not exist",
      });
    }
    const data = req.query;
    data.secure_hash_data = JSON.parse(decryptor(secure_hash));
    data.app = app;
    req.apps = data;
    next();
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
      message: "The App is not exist",
    });
  }
};

module.exports = ssoAuth;
