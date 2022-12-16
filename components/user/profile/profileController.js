const profileService = require('./profileService');
const authorizeRepository = require('../../_auth/authorizeRepository');

const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const self_editSchema = require('../../_auth/schema/self_editProfile');

const ajv = new Ajv();
addFormats(ajv);

exports.profileRedirect = (req, res) => {
    res.redirect("/user/profile");
}

exports.profile = async (req, res) => {
  res.render("user/profile/profile", { layout: "user_layout" });
};

exports.editProfile = async (req, res) => {
    if(!ajv.validate(self_editSchema, req.body)){
        res.render("user/profile/profile", { layout: "user_layout", error: 'Invalid input!'});
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
    const temp = Object.values(req.user);
    if(!password){
        try{
            const user = await profileService.editInfo(fullname, phonenumber, email, temp[1], temp[3]);
            req.logIn(user, function(error){
                if(!error){
                    console.log(req.user);
                    res.redirect("/user/profile");
                }
            });
        }catch(e){
            res.render("user/profile/profile", { layout: "user_layout", error: e.message});
            return;
        }
    }else if(newpassword !== renewpassword){
        res.render("user/profile/profile", { layout: "user_layout", error: 'New passwords do not match!'});
        return;
    }else{
        try{
            const user = await profileService.changePassword(temp[1], password, newpassword);
            req.logIn(user, function(error){
                if(!error){
                    console.log(req.user);
                    res.redirect("/user/profile");
                }
            });
        }catch(e){
            res.render("user/profile/profile", { layout: "user_layout", error: e.message});
            return;
        }
    }
}

exports.signout = (req, res) => {
    req.logout(function (err){
        if(err){
            return next(err);
        }
        res.redirect('/');
    })
}