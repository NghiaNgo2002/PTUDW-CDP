var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(isLogin === 1)
        res.redirect('/admin');
    if(isLogin === 2)
        res.redirect('/user');
    res.render('index', { title: 'Express', layout: false});
});

module.exports = router;
