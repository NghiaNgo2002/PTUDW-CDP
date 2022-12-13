const globalVar = require("../../../routes/globalVar");

exports.register = (req, res) => {
  if(!req.user){
      res.redirect("/");
  }else if(Object.values(req.user)[0] !== 1){
      res.redirect("/user");
  }
  res.render("admin/register/register", { layout: "admin_layout" });
};
