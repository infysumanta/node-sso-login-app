require("dotenv").config();
require("./config/db").connectDB();
require("axios");
const config = require("./config");
const app = require("./app.js");
const { request } = require("express");

app.listen(config.PORT, () => {
  console.log(`Server listening on ${config.PORT}`);
});
