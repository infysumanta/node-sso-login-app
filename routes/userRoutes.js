const express = require("express");
const {
  userDetails,
  userAccount,
  usetSetting,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(userDetails);
router.route("/setting").get(usetSetting);
router.route("/account").get(userAccount);

module.exports = router;
