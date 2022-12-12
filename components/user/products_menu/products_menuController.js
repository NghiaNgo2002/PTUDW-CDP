const globalVar = require("../../../routes/globalVar");
const products_menuService = require("./products_menuService");
const qs = require("qs");

exports.products_menu = async (req, res) => {
  if(Object.values(agent).length === 0){
     res.redirect("/");
  }else if(Object.values(agent)[0] === 1){
     res.redirect("/admin");
  }
  const { name: nameFilter } = req.query;
  let products = [];
  const { sort, ...withoutSort } = req.query;
  if (nameFilter) {
    products = await products_menuService.filter(nameFilter);
  } else products = await products_menuService.getAll();

if(sort=="low"){
  products.sort((a,b)=> a.PRICE-b.PRICE);
}else if(sort=="high"){
  products.sort((a,b)=> b.PRICE-a.PRICE);
}

  let products_menu_Com = await products_menuService.getCategory("Cơm");
  let products_menu_Mi = await products_menuService.getCategory("Mì");
  let products_menu_Nuoc = await products_menuService.getCategory("Nước");
  let products_menu_Khac = await products_menuService.getCategory("Khác");

  res.render("user/products_menu/menu", {
    products,
    products_menu_Com,
    products_menu_Mi,
    products_menu_Nuoc,
    products_menu_Khac,
    agent,
    layout: "user_layout",
    originalUrl: `${req.baseUrl}/products_menu?${qs.stringify(withoutSort)}`,
  });
};
