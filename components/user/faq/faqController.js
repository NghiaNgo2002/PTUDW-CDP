const globalVar = require("../../../routes/globalVar");

exports.faq = (req, res) => {
  if(Object.values(agent).length === 0){
      res.redirect("/");
  }else if(Object.values(agent)[0] === 1){
      res.redirect("/admin");
  }
  res.render("user/faq/faq", {agent, layout: "user_layout" });
};
