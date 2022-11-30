const express = require("express");
const router = express.Router();

const productController = require("./productController");

router.get("/", productController.details);

module.exports = router;
