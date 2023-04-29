const globalVar = require('../../routes/globalVar');

exports.statistic = (req, res)=>{
    if(!globalVar.getIsLogin()){
        res.redirect("/");
    }
    res.render('statistic/statistic');
}