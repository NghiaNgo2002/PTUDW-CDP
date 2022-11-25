const express = require('express');
const router = express.Router();

const userController = require('./userController');

router.get('/', userController.profile);
router.get('/profile', userController.profile);

module.exports = router;
