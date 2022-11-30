const express = require("express");
const router = express.Router();

const orders_historyController = require("./orders_historyController");

router.get("/", orders_historyController.orders_history);

module.exports = router;
