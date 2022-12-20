const express = require("express");
const router = express.Router();

const edit_accounts = require("./edit_accounts/accountsController");
const edit_products = require("./edit_products/edit_productsController");
const profile = require("./profile/profileController");
const statistic = require("./statistic/statisticController");
const register = require("./register/registerController");

router.get("/", profile.profileRedirect);
router.get("/edit_accounts", edit_accounts.account);
router.get("/edit_products", edit_products.product);
router.get("/profile", profile.profile);
router.post("/profile", profile.editProfile);
router.get('/signout', profile.signout);
router.get("/statistic", statistic.statistic);
router.get("/register", register.register);

//add
router.get("/edit_accounts/add",edit_accounts.add);
router.post('/edit_accounts/add', edit_accounts.saveAdd);
router.get("/edit_products/add",edit_accounts.add);
router.post('/edit_products/add', edit_accounts.saveAdd);
//edit
router.get("/edit_accounts/:id", edit_accounts.details);
router.get("/edit_products/:id", edit_products.details);
// del
router.post("/edit_accounts/del",edit_accounts.delete);
router.post("/edit_products/del",edit_products.delete);

//update
router.post("/edit_accounts/patch", edit_accounts.saveEdit);
router.post("/edit_products/patch", edit_products.saveEdit);
//lock and unlock
router.post("/edit_accounts/lock", edit_accounts.setLock);
router.post("/edit_accounts/unlock", edit_accounts.setUnLock);

//API
router.get("/api/edit_accounts/active", edit_accounts.getActive);
router.get("/api/edit_accounts", edit_accounts.paginator);

router.get("/api/edit_products/category", edit_products.getCategory);
router.get("/api/edit_products", edit_products.paginator);

module.exports = router;
