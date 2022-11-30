const globalVar = require("../../../routes/globalVar");

exports.details = (req, res) => {
  if (!globalVar.getIsLogin()) {
    res.redirect("/");
  }
  res.render("user/products/details", { layout: "user_layout" });
};
