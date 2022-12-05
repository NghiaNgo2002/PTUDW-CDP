const globalVar = require("../../../routes/globalVar");

exports.contact = (req, res) => {
  if (isLogin !== 2) {
    if (isLogin === 1) res.redirect("/admin");
    res.redirect("/");
  }
  res.render("user/contact/contact", {agent, layout: "user_layout" });
};
