const globalVar = require("../../../routes/globalVar");

exports.statistic = (req, res) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  res.render("admin/statistic/statistic", {agent, layout: "admin_layout" });
};
