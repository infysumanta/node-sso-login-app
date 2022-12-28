const express = require("express");
const expressLayout = require("express-ejs-layouts");
const flash = require("express-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const config = require("./config");

const app = express();

app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
      mongoUrl: config.MONGO_URI,
      ttl: 1000 * 60 * 60 * 24,
    }),
  })
);

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayout);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/homeRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/user", require("./routes/userRoutes"));

module.exports = app;
