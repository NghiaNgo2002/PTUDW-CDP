const globalVar = require("../../../routes/globalVar");

exports.edit_products = (req, res) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  res.render("admin/edit_products/edit_table", { layout: "admin_layout" });
};
