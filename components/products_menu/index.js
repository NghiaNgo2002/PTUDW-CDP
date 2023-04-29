const express = require("express");
const router = express.Router();

const products_menuController = require("./products_menuController");

router.get("/", products_menuController.products_menu);

module.exports = router;
