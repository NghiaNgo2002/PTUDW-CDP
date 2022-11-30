const globalVar = require('../../../routes/globalVar');

exports.statistic = (req, res)=>{
    if(!globalVar.getIsLogin()){
        res.redirect("/");
    }
    res.render('admin/statistic/statistic', {layout: "admin_layout"});
}