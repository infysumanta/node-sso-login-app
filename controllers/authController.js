exports.register = (req, res) => {
  res.render("auth/register");
};
exports.postRegister = async (req, res) => {
  const { name, username, email, password } = req.body;
};
exports.login = (req, res) => {
  res.render("auth/login");
};
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
};
