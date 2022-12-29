const express = require("express");
const { home } = require("../controllers/homeController");
const {
  ssoAuthLogin,
  testSSOAuthLogin,
} = require("../controllers/ssoAuthController");
const ssoAuth = require("../middleware/ssoAuth");

const router = express.Router();
router.route("/login").get(testSSOAuthLogin);

router.route("/authenticate").get(ssoAuth, ssoAuthLogin);

module.exports = router;
