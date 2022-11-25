const express = require('express');
const router = express.Router();

const productController = require('./productController');

router.get('/', productController.details);
router.get('/edit-table', productController.edit_table);

module.exports = router;