const globalVar = require("../../../routes/globalVar");

exports.orders_history = (req, res) => {
  if(!req.user){
      res.redirect("/");
  }else if(Object.values(req.user)[0] === 1){
      res.redirect("/admin");
  }
  res.render("user/orders_history/orders_history", { layout: "user_layout" });
};
