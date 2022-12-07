const globalVar = require("../../../routes/globalVar");
const profileService = require('./profileService');

exports.profile = async (req, res) => {
  if (isLogin !== 2) {
    if (isLogin === 1) res.redirect("/admin");
    res.redirect("/");
  }
  const {
      fullname : fullname,
      phonenumber : phonenumber,
      password : password,
      newpassword : newpassword,
      renewpassword : renewpassword
  } = req.query;
  if(typeof(fullname) !== 'undefined'|| typeof(phonenumber) !== 'undefined'){
      profileService.changeInfo(fullname, phonenumber).then(function (){
        res.redirect("/user/profile");
      })
  }else if(typeof(password) !== 'undefined' && typeof(newpassword) !== 'undefined' && typeof(renewpassword) !== 'undefined'){
      profileService.changePassword(password, newpassword, renewpassword).then(function (){
        res.redirect("/user/profile");
      })
  }else res.render("user/profile/profile", { agent, layout: "user_layout" });
};
