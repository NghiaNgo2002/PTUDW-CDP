const globalVar = require("../../../routes/globalVar");

exports.products_menu = (req, res) => {
  if (isLogin!==2) {
        if(isLogin === 1)
            res.redirect('/admin');
        res.redirect("/");
    }
  res.render("user/products_menu/menu", { layout: "user_layout" });
};
