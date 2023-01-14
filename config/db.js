const mongoose = require("mongoose");
const config = require(".");

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected....");
    })
    .catch((err) => {
      console.log(err);
      console.log("Connection Failed...");
    });
};

module.exports = { connectDB };
