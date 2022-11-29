const globalVar = require('../../routes/globalVar');

exports.edit_products = (req, res)=>{
    if(!globalVar.getIsLogin()){
        res.redirect("/");
    }
    res.render('edit_products/edit_table');
}