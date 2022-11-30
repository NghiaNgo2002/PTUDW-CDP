const express = require('express');
const router = express.Router();

const edit_accounts = require('./edit_accounts/accountsController');
const edit_products = require('./edit_products/edit_productsController');
const profile = require('./profile/profileController');
const statistic = require('./statistic/statisticController');

router.get('/', profile.profile);
router.get('/edit_accounts', edit_accounts.account);
router.get('/edit_products', edit_products.edit_products);
router.get('/profile', profile.profile);
router.get('/statistic', statistic.statistic);

module.exports = router;