const express = require('express');
const router = express.Router();

const edit_productsController = require('./accountsController');

router.get('/', edit_productsController.account);
router.get('/account', edit_productsController.account);

module.exports = router;