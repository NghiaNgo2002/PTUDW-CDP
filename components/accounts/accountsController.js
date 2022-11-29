const globalVar = require('../../routes/globalVar');

exports.account = (req, res)=>{
    if(!globalVar.getIsLogin()){
        res.redirect("/");  
    };
    res.render('accounts/accounts');
}