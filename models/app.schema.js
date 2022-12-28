const mongoose = require("mongoose");

const appSchema = new mongoose.Schema(
  {
    app_name: {
      type: String,
      require: true,
    },
    app_secret: {
      type: String,
      require: true,
    },
    app_mode: {
      type: String,
      default: "development",
      require: true,
    },
    app_secure: {
      type: Boolean,
      default: true,
    },
    app_domain: {
      type: String,
      require: true,
    },
    contact_email: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    privacy_policy_url: {
      type: String,
      require: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const App = mongoose.model("App", appSchema);

module.exports = App;
