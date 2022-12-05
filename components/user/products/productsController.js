const globalVar = require("../../../routes/globalVar");
const productsService = require("./productsService");

exports.details = async (req, res, next) => {
  if (isLogin !== 2) {
    if (isLogin === 1) res.redirect("/admin");
    res.redirect("/");
  }
  const { productId } = req.params;
  const product = await productsService.get(productId);
  res.render("user/products/details", { product, layout: "user_layout" });
};
