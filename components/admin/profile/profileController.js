const globalVar = require("../../../routes/globalVar");
const profileService = require('./profileService');

exports.profile = async (req, res) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  const {fullname : fullname, phonenumber : phonenumber} = req.query;
  if(typeof(fullname) !== 'undefined'|| typeof(phonenumber) !== 'undefined'){
      profileService.changeInfo(fullname, phonenumber).then(function (){
        res.redirect("/admin/profile");
      })
  }else res.render("admin/profile/profile", { agent, layout: "admin_layout" });
};
