const globalVar = require('../../../routes/globalVar');

exports.products_menu = (req, res)=>{
  if(!globalVar.getIsLogin()){
    res.redirect("/");
  }
  res.render('user/products_menu', {layout: "user_layout"});
}