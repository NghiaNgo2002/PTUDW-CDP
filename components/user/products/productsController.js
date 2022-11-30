const globalVar = require("../../../routes/globalVar");

exports.details = (req, res) => {
  if (isLogin!==2) {
        if(isLogin === 1)
            res.redirect('/admin');
        res.redirect("/");
    }
  res.render("user/products/details", { layout: "user_layout" });
};
