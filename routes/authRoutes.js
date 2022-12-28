const express = require("express");
const {
  login,
  postLogin,
  register,
  postRegister,
  redirectToLogin,
  logout,
} = require("../controllers/authController");
const guest = require("../middleware/guest");
const router = express.Router();

router.route("/").get(redirectToLogin);

router.route("/login").get(login).post(guest, postLogin);
router.route("/register").get(register).post(guest, postRegister);
router.route("/logout").post(logout).get(logout);

module.exports = router;
