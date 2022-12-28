const express = require("express");
const { home } = require("../controllers/homeController");
const { ssoAuthLogin } = require("../controllers/ssoAuthController");

const router = express.Router();

router.route("/authenticate").get(ssoAuthLogin);

module.exports = router;
