const globalVar = require('./globalVar');

exports.admin = (req, res)=>{
  isLogin = 1;
  res.redirect("/admin");
}

exports.user = (req, res)=>{
  isLogin = 2;
  res.redirect("/user");
}

exports.none = (req, res)=>{
  isLogin = 0;
  res.redirect("/");
}