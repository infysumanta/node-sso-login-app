const express = require("express");
const {
  login,
  postLogin,
  register,
  postRegister,
} = require("../controllers/authController");
const router = express.Router();

router.route("/login").get(login).post(postLogin);
router.route("/register").get(register).post(postRegister);

module.exports = router;
