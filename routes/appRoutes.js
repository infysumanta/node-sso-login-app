const express = require("express");
const {
  myApps,
  singleApps,
  saveApp,
  changeMode,
  updateApp,
} = require("../controllers/appController");

const router = express.Router();

router.route("/myapp").get(myApps);
router.route("/save_app").post(saveApp);
router.route("/myapp/:app_id").get(singleApps);
router.route("/myapp/:app_id/changeMode").post(changeMode);
router.route("/myapp/:app_id/update").post(updateApp);

module.exports = router;
