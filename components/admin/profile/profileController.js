const globalVar = require("../../../routes/globalVar");
const profileService = require('./profileService');
const authorizeService = require('../../_auth/authorizeService');

const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const self_editSchema = require('../../_auth/schema/self_editProfile');

const ajv = new Ajv();
addFormats(ajv);

exports.profileRedirect = (req, res) => {
    res.redirect("/admin/profile");
}

exports.profile = async (req, res) => {
  if(Object.values(agent).length === 0){
      res.redirect("/");
  }else if(Object.values(agent)[0] !== 1){
      res.redirect("/user");
  }
  res.render("admin/profile/profile", { agent, layout: "admin_layout" });
};

exports.editProfile = async (req, res) => {
    if(!ajv.validate(self_editSchema, req.body)){
        res.render("admin/profile/profile", { agent, layout: "admin_layout", error: 'Invalid input!'});
        return;
    }
    const {
        fullname : fullname,
        phonenumber : phonenumber,
        email : email,
        password : password,
        newpassword : newpassword,
        renewpassword : renewpassword
    } = req.body;
    const temp = Object.values(agent);
    if(!password){
        try{
            await profileService.editInfo(fullname, phonenumber, email, temp[1], temp[4]).then(function (){
                res.redirect("/admin/profile");
            })
        }catch(e){
            res.render("admin/profile/profile", { agent, layout: "admin_layout", error: e.message});
            return;
        }
    }else if(newpassword !== renewpassword){
        res.render("admin/profile/profile", { agent, layout: "admin_layout", error: 'New passwords do not match!'});
        return;
    }else{
        try{
            await profileService.changePassword(temp[1], password, newpassword).then(function (){
                res.redirect("/admin/profile");
            })
        }catch(e){
            res.render("admin/profile/profile", { agent, layout: "admin_layout", error: e.message});
            return;
        }
    }
}