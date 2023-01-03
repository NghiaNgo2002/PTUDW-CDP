const express = require("express");
const router = express.Router();

const upload = require("../../middleware/upload");

const cart = require("./cart/cartController");
const contact = require("./contact/contactController");
const profile = require("./profile/profileController");
const faq = require("./faq/faqController");
const orders_history = require("./orders_history/orders_historyController");
const products = require("./products/productsController");
const products_menu = require("./products_menu/products_menuController");
const menu_api = require("./products_menu/menu_api/menu_api");
const cart_api = require("./cart/api/cart_api");

router.get("/", profile.profileRedirect);
router.get("/cart", cart.cart);
router.get("/contact", contact.contact);

router.get("/profile", profile.profile);
router.post("/profile/information", profile.editProfile);
router.post("/profile/password", profile.changePassword);
router.post("/profile/image", upload.single("image"), profile.editAvatar);
router.get("/profile/remove-image", profile.removeAvatar);
router.get("/profile/reload", profile.reload);

router.get("/signout", profile.signout);

router.get("/faq", faq.faq);
router.get("/orders_history", orders_history.orders_history);
router.get("/orders_history_food", orders_history.orders_history_food);
router.get("/products/:productId", products.details);
router.get("/products_menu", products_menu.products_menu);
router.get("/api/products_menu", menu_api.getProductPage);

router.get("/api/cart", cart_api.cartDetail);
router.post("/api/cart/add", cart_api.add);
router.post("/api/cart/edit", cart_api.edit);
router.post("/api/cart/remove", cart_api.remove);
router.get("/api/cart/removeAll", cart_api.removeAll);
router.get("/api/cart/getBudget", cart_api.getBudget);
router.post("/api/cart/checkOut", cart_api.checkOut);
router.post("/api/cart/reqBudget", cart_api.reqBudget);

// router.post("/api/cart/addBudget", cart_api.addBudget);

module.exports = router;
