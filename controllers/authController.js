const User = require("./../models/user.schema");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.register = (_req, res) => {
  res.render("auth/register");
};
exports.postRegister = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    if (!firstName || !lastName || !username || !email || !password) {
      req.flash("error", "All fields are required");
      req.flash("firstName", firstName);
      req.flash("lastName", lastName);
      req.flash("username", username);
      req.flash("email", email);
      return res.redirect("/auth/register");
    }

    const emailExist = await User.exists({ email: email });
    if (emailExist) {
      req.flash("error", "Email already exists");
      req.flash("firstName", firstName);
      req.flash("lastName", lastName);
      req.flash("username", username);
      req.flash("email", email);
      return res.redirect("/auth/register");
    }

    const usernameExist = await User.exists({ username: username });
    if (usernameExist) {
      req.flash("error", "Email already exists");
      req.flash("firstName", firstName);
      req.flash("lastName", lastName);
      req.flash("username", username);
      req.flash("email", email);
      return res.redirect("/auth/register");
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: passwordHash,
    });

    await user.save();
    req.flash("success", "Account Created Successfully, Login Now!");
    return res.redirect("/auth/login");
  } catch (error) {
    req.flash("error", "Something went wrong");
    return res.redirect("/auth/register");
  }
};
exports.login = (_req, res) => {
  res.render("auth/login");
};
exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash("error", "All fields are required");
      req.flash("email", email);
      return res.redirect("/auth/login");
    }

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        req.flash("error", info.message);
        return next(err);
      }
      if (!user) {
        req.flash("error", info.message);
        return res.redirect("/auth/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }

        return res.redirect("/user/");
      });
    })(req, res, next);
  } catch (error) {
    console.log(error);
    req.flash("error", "Something went wrong");
    return res.redirect("/auth/login");
  }
};

exports.logout = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");
  });
};

exports.redirectToLogin = (req, res) => {
  res.redirect("/auth/login");
};
