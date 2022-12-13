const globalVar = require("../../../routes/globalVar");

exports.faq = (req, res) => {
  if(!req.user){
      res.redirect("/");
  }else if(Object.values(req.user)[0] === 1){
      res.redirect("/admin");
  }
  res.render("user/faq/faq", { layout: "user_layout" });
};
