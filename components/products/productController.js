const globalVar = require("../../routes/globalVar");

exports.details = (req, res) => {
  if (!globalVar.getIsLogin()) {
    res.redirect("/");
  }
  res.render("product/details");
};
