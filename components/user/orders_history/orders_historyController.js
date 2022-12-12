const globalVar = require("../../../routes/globalVar");

exports.orders_history = (req, res) => {
  if(Object.values(agent).length === 0){
      res.redirect("/");
  }else if(Object.values(agent)[0] === 1){
      res.redirect("/admin");
  }
  res.render("user/orders_history/orders_history", {agent, layout: "user_layout" });
};
