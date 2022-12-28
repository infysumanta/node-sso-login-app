const express = require("express");
const { myApps, singleApps } = require("../controllers/appController");

const router = express.Router();

router.route("/myapp").get(myApps);
router.route("/myapp/:app_id").get(singleApps);

module.exports = router;
