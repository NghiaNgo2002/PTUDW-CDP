const productService = require("../products_menu/products_menuService");

exports.add = (productId, cart) => {
  const foundProduct = cart.products.find(
    (product) => product.id === productId
  );
  if (foundProduct) foundProduct.quantity = foundProduct.quantity + 1;
  else {
    cart.products.push({ id: productId, quantity: 1 });
  }
  console.log(cart);
};

exports.cartDetails = async (cart) => {
  const cartDetails = { ...cart };
  cartDetails.products = await Promise.all(
    cartDetails.products.map(async (product) => {
      const productInfo = await productService.get(product.id);
      console.log(productInfo);
      return {
        ...product,
        name: productInfo.NAME,
        price: productInfo.PRICE,
      };
    })
  );
  console.log(cartDetails);
  return cartDetails;
};

exports.initCart = () => ({
  products: [],
});
