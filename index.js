require("dotenv").config();
require("./config/db").connectDB();
const config = require("./config");

const app = require("./app.js");

app.listen(config.PORT, () => {
  console.log(`Server listening on ${config.PORT}`);
});
