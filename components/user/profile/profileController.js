const globalVar = require('../../../routes/globalVar');

exports.profile = (req, res)=>{
    if (isLogin!==2) {
        if(isLogin === 1)
            res.redirect('/admin');
        res.redirect("/");
    }
    res.render('user/profile/profile' , { layout: "user_layout"});
}
