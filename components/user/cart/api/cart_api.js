const cartService = require("../cartService");
const productsService = require("../../products/productsService");
const orders_historyService = require("../../orders_history/orders_historyService");

exports.add = async (req, res) => {
  const { productID: productId } = req.body;
  // validate valid productId
  // ...
  const product = await productsService.get(productId);
  if (product == null) {
  } else {
    if (!req.session.cart) req.session.cart = cartService.initCart();
    cartService.add(productId, req.session.cart);
    res.json(req.session.cart);
  }
};

exports.edit = async (req, res) => {
  const { productID: productId } = req.body;
  const { quantity: quantity } = req.body;
  cartService.edit(productId, quantity, req.session.cart);
  res.json(req.session.cart);
};

exports.remove = async (req, res) => {
  const { productID: productId } = req.body;
  cartService.remove(productId, req.session.cart);
  res.json(req.session.cart);
};

exports.cartDetail = async (req, res) => {
  res.json(await cartService.cartDetails(req.session.cart));
};

exports.getBudget = async (req, res) => {
  res.json(req.user);
};

exports.removeAll = async (req, res) => {
  req.session.cart = cartService.initCart();
  res.json(req.session.cart);
};

exports.checkOut = async (req, res) => {
  const { remainBudget: money } = req.body;
  const { userID: userID } = req.body;
  const user = await cartService.checkOut(userID, money);

  const curCart = await cartService.cartDetails(req.session.cart);
  Object.values(curCart.products).forEach((value) => {
    orders_historyService.insertHistory(value);
  });
  req.user = user;
  console.log(req.user);
  res.json(user);
};
