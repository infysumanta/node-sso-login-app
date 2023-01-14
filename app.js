const express = require("express");
const expressLayout = require("express-ejs-layouts");
const flash = require("express-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const config = require("./config");
const passport = require("passport");
const passportInit = require("./config/passport");
const cookieParser = require("cookie-parser");

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
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayout);
app.use(express.static(path.join(__dirname, "public")));

// passport connfig
app.use(passport.initialize());
app.use(passport.session());
passportInit(passport);
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  if (req.user) {
    res.locals.user.fullname = req.user.firstName + " " + req.user.lastName;
  }
  next();
});

app.use("/", require("./routes/homeRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/apps", require("./routes/appRoutes"));
app.use("/sso/auth", require("./routes/ssoAuthRoutes"));

module.exports = app;
