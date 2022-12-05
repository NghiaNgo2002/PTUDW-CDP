const globalVar = require("../../../routes/globalVar");

exports.orders_history = (req, res) => {
  if (isLogin !== 2) {
    if (isLogin === 1) res.redirect("/admin");
    res.redirect("/");
  }
  res.render("user/orders_history/orders_history", {agent, layout: "user_layout" });
};
