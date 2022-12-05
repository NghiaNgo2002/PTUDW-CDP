const globalVar = require("../../../routes/globalVar");
const productService = require('./accountsData');


exports.account = (req, res) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }

  res.render("admin/edit_accounts/accounts", {agent, layout: "admin_layout" });
};
