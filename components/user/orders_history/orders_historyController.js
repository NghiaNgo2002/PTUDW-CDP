const globalVar = require('../../../routes/globalVar');

exports.orders_history = (req, res)=>{
  globalVar.changeIsLogin(true);
  res.render('user/orders_history/orders_history', { layout: "user_layout"});
}
