const globalVar = require("../../../routes/globalVar");

exports.cart = (req, res) => {
  if(!req.user){
      res.redirect("/");
  }else if(Object.values(req.user)[0] === 1){
      res.redirect("/admin");
  }
  res.render("user/cart/cart", { layout: "user_layout" });
};
