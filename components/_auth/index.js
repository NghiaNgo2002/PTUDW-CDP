const express = require('express');
const router = express.Router();

const authorizeController = require('./authorizeController');
const passport = require('./passport/index');

router.get('/', authorizeController.showLoginForm);
router.post('/', passport.authenticate('local',{
    successRedirect: '/user',
    failureRedirect: '/auth?error=1',
}));

router.get('/register', authorizeController.showRegisterForm);
router.post('/register', authorizeController.register);

module.exports = router;