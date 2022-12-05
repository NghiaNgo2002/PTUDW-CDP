const express = require("express");
const router = express.Router();

const edit_accounts = require("./edit_accounts/accountsController");
const edit_products = require("./edit_products/edit_productsController");
const profile = require("./profile/profileController");
const statistic = require("./statistic/statisticController");
const register = require("./register/registerController");

router.get("/", profile.profile);
router.get("/edit_accounts", edit_accounts.account);
router.get("/edit_products", edit_products.edit_products);
router.get("/profile", profile.profile);
router.get("/statistic", statistic.statistic);
router.get("/register", register.register);

//edit
router.get("/edit_accounts/:id", edit_accounts.details)
// del
router.post("/edit_accounts/del",edit_accounts.delete)

//update
router.post("/update", edit_accounts.save);

module.exports = router;
