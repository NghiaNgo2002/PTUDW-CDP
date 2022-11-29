const express = require('express');
const router = express.Router();

const edit_productsController = require('./statisticController');

router.get('/', edit_productsController.statistic);

module.exports = router;