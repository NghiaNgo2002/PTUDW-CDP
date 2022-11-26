const express = require('express');
const router = express.Router();

const edit_productsController = require('./edit_productsController');

router.get('/', edit_productsController.edit_products);
router.get('/profile', edit_productsController.edit_products);

module.exports = router;
