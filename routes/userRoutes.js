const express = require("express");
const { userDetails } = require("../controllers/userController");

const router = express.Router();

router.route("/").get(userDetails);

module.exports = router;
