const globalVar = require("../../../routes/globalVar");

exports.contact = (req, res) => {
  if(!req.user){
      res.redirect("/");
  }else if(Object.values(req.user)[0] === 1){
      res.redirect("/admin");
  }
  res.render("user/contact/contact", { layout: "user_layout" });
};
