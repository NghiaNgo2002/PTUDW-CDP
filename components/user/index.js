const express = require("express");
const router = express.Router();

const cart = require("./cart/cartController");
const contact = require("./contact/contactController");
const profile = require("./profile/profileController");
const faq = require("./faq/faqController");
const orders_history = require("./orders_history/orders_historyController");
const products = require("./products/productsController");
const products_menu = require("./products_menu/products_menuController");

router.get("/", profile.profileRedirect);
router.get("/cart", cart.cart);
router.get("/contact", contact.contact);
router.get("/profile", profile.profile);
router.post("/profile", profile.editProfile);
router.get('/signout', profile.signout);
router.get("/faq", faq.faq);
router.get("/orders_history", orders_history.orders_history);
router.get("/products/:productId", products.details);
router.get("/products_menu", products_menu.products_menu);

module.exports = router;
