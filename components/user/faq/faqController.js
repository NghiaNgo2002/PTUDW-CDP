const globalVar = require("../../../routes/globalVar");

exports.faq = (req, res) => {
  if (isLogin !== 2) {
    if (isLogin === 1) res.redirect("/admin");
    res.redirect("/");
  }
  res.render("user/faq/faq", { layout: "user_layout" });
};
