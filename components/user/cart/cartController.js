const globalVar = require('../../../routes/globalVar');

exports.cart = (req, res)=>{
  globalVar.changeIsLogin(true);
  res.render('user/cart/cart', { layout: "user_layout"});
}
