const express = require("express");
const { home } = require("../controllers/homeController");
const {
  ssoAuthLogin,
  testSSOAuthLogin,
} = require("../controllers/ssoAuthController");

const router = express.Router();

router.route("/authenticate").get(ssoAuthLogin);
router.route("/login").get(testSSOAuthLogin);

module.exports = router;
