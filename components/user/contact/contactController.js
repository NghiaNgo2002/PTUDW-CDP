const globalVar = require('../../../routes/globalVar');

exports.contact = (req, res)=>{
  globalVar.changeIsLogin(true);
  res.render('user/contact/contact', { layout: "user_layout"});
}
