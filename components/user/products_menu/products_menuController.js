const globalVar = require("../../../routes/globalVar");
const products_menuService = require("./products_menuService");

exports.products_menu = async (req, res) => {
  if (isLogin !== 2) {
    if (isLogin === 1) res.redirect("/admin");
    res.redirect("/");
  }

  let products_menu = await products_menuService.getAll();
  res.render("user/products_menu/menu", {
    products_menu,
    layout: "user_layout",
  });
};
