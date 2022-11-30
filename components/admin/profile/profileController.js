const globalVar = require("../../../routes/globalVar");

exports.profile = (req, res) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  res.render("admin/profile/profile", { layout: "admin_layout" });
};
