const cartService = require("../cartService");

exports.add = (req, res) => {
  const { productID: productId } = req.body;
  // validate valid productId
  // ...

  if (!req.session.cart) req.session.cart = cartService.initCart();
  cartService.add(productId, req.session.cart);
  res.json(req.session.cart);
};

exports.cartDetail = async (req, res) => {
  res.json(await cartService.cartDetails(req.session.cart));
};
