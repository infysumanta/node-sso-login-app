const crypto = require("crypto");
const App = require("./../models/app.schema");
exports.myApps = async (req, res) => {
  const page = req.query.page || 1;
  const perPage = 9;
  const skip = (page - 1) * perPage + 1;
  const apps = await App.find().skip(skip).limit(perPage);
  res.render("apps/my_apps", {
    apps: apps,
    page: page,
    perPage: perPage,
    isPrevious: Number(page) === 1 ? true : false,
    isNext: apps.length < 9 ? true : false,
  });
};

exports.singleApps = async (req, res) => {
  const app_id = req.params.app_id;
  const app = await App.findById(app_id);
  res.render("apps/single_app", { app: app });
};

exports.saveApp = async (req, res) => {
  try {
    const { app_name } = req.body;
    const isNameExist = await App.exists({ app_name: app_name });

    if (isNameExist) {
      return res.json({
        success: false,
        message: `Please Enter different name and ${app_name} is already exist in your project`,
      });
    }

    const app_secret = await crypto.randomUUID();
    const app = new App({
      app_name: app_name,
      app_secret: app_secret,
    });
    await app.save();
    res.json({
      success: true,
      data: app,
      message: `App Saved Successfully`,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.changeMode = async (req, res) => {
  try {
    const app_id = req.params.app_id;
    const app = await App.findById(app_id);
    app.app_mode = app.app_mode === "live" ? "development" : "live";
    await app.save();
    res.redirect(`/apps/myapp/${app_id}`);
  } catch (error) {
    console.log(error);
  }
};
exports.updateApp = async (req, res) => {
  try {
    const app_id = req.params.app_id;
    await App.findByIdAndUpdate(app_id, {
      app_name: req.body.app_name,
      app_domain: req.body.app_domain,
      category: req.body.category,
      contact_email: req.body.contact_email,
      privacy_policy_url: req.body.privacy_policy_url,
    });
    res.redirect(`/apps/myapp/${app_id}`);
  } catch (error) {
    console.log(error);
  }
};
