const globalVar = require("../../../routes/globalVar");

exports.register = (req, res) => {
  if(Object.values(agent).length === 0){
      res.redirect("/");
  }else if(Object.values(agent)[0] !== 1){
      res.redirect("/user");
  }
  res.render("admin/register/register", {agent, layout: "admin_layout" });
};
