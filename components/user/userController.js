const globalVar = require('../../routes/globalVar');

exports.profile = (req, res)=>{
    if(!globalVar.getIsLogin()){
        res.redirect("/");
    }
    res.render('user/profile');
}
