const globalVar = require('../../../routes/globalVar');

exports.account = (req, res)=>{
    if(!globalVar.getIsLogin()){
        res.redirect("/");
    }
    res.render('admin/edit_accounts/accounts', {layout: "admin_layout"});
}