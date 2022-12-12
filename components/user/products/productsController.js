const globalVar = require("../../../routes/globalVar");
const productsService = require("./productsService");
const relatedProductService= require("../products_menu/products_menuService");


exports.details = async (req, res, next) => {
  if(Object.values(agent).length === 0){
      res.redirect("/");
  }else if(Object.values(agent)[0] === 1){
      res.redirect("/admin");
  }
  const { productId } = req.params;
  const product = await productsService.get(productId);

  const relatedProducts= await relatedProductService.getCategory(product.CATEGORY);

  for (let [i, item] of relatedProducts.entries()) {
    if (item.ID == productId) {
      relatedProducts.splice(i, 1);
    }
  }
  res.render("user/products/details", { product, relatedProducts, originalUrl: `${req.baseUrl}`,agent, layout: "user_layout" });
};
