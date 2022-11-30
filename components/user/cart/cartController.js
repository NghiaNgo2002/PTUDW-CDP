const globalVar = require('../../../routes/globalVar');

exports.cart = (req, res)=>{
  if (isLogin!==2) {
        if(isLogin === 1)
            res.redirect('/admin');
        res.redirect("/");
    }
  res.render('user/cart/cart', { layout: "user_layout"});
}
