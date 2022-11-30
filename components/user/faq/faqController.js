const globalVar = require('../../../routes/globalVar');

exports.faq = (req, res)=>{
  globalVar.changeIsLogin(true);
  res.render('user/faq/faq', { layout: "user_layout"});
}
