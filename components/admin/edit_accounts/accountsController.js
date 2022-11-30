const globalVar = require('../../../routes/globalVar');

exports.account = (req, res)=>{
    if (isLogin!==1) {
        if(isLogin === 2)
            res.redirect('/user');
        res.redirect("/");
    }
    res.render('admin/edit_accounts/accounts', {layout: "admin_layout"});
}