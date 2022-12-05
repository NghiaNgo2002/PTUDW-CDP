var express = require('express');
var router = express.Router();

const authorizeController = require('./authorizeController');

router.get('/', authorizeController.authorize);
router.get('/none', authorizeController.none);

module.exports = router;
