const globalVar = require("../../../routes/globalVar");

exports.register = (req, res) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  res.render("admin/register/register", {agent, layout: "admin_layout" });
};
