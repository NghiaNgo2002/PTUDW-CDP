const globalVar = require("../../../routes/globalVar");
const products = require("./edit_productsService");
const qs = require("qs");
exports.product = async (req, res) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  const { name: nameFilter } = req.query;
  let list_products = [];
  const { sort, withoutSort } = req.query;
  if (nameFilter) {
    list_products = await products.filter(nameFilter);
  } else list_products = await products.getAll();

  if(sort=="name"){
    list_products.sort((a,b)=> a.NAME-b.NAME);
  }else if(sort=="price"){
    list_products.sort((a,b)=> a.PRICE - b.PRICE);
  }

  res.render("admin/edit_products/products", {
    list_products,
    agent,
    layout: "admin_layout",
    originalUrl: `${req.baseUrl}/edit_products?${qs.stringify(withoutSort)}`,
  });
};

exports.details = async (req, res, next) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  const { id:id } = req.params;

  const detail = await products.getId(id);
  console.log(detail);

  res.render('admin/edit_products/details', {
    detail,
    agent,
    layout: "admin_layout"});
};

exports.delete = async (req, res, next) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  const { productId } = req.params;
  await products.delete(productId);
  res.render('admin/edit_products/details',{
    agent,
    layout: "admin_layout"});
};

exports.saveEdit = async (req, res, next) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  const product = req.body;

  await products.saveEdit(product);

  res.redirect("/admin/edit_products");
};

exports.add = (req, res, next) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  res.render('admin/edit_products/add', {
    agent,
    layout: "admin_layout"
  });
}

exports.saveAdd = async (req, res, next) => {
  if (isLogin !== 1) {
    if (isLogin === 2) res.redirect("/user");
    res.redirect("/");
  }
  const product = req.body;

  const nextId = await products.nextId();
  await products.add(product, nextId);
  res.render('admin/edit_products', {
    agent,
    layout: "admin_layout"
  });
}
