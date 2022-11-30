const globalVar = require('../../../routes/globalVar');

exports.profile = (req, res)=>{
    globalVar.changeIsLogin(true);
    res.render('admin/profile/profile', { layout: "admin_layout"});
}
