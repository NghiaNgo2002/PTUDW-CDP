const passport = require('passport');
const LocalStrategy = require('passport-local');
const authorizeService = require('../authorizeService');

passport.use(new LocalStrategy({ usernameField: 'phonenumber'}, async function verify(username, password, cb){
    const user = await authorizeService.checkUserCredential(username, password);
    if(user)
        return cb(null, user);
    return cb(null, false);
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { 
        id: Object.values(user)[0],
        phonenumber: Object.values(user)[1],
        fullname: Object.values(user)[3],
        email: Object.values(user)[4],
        createddate: Object.values(user)[5],
        level: Object.values(user)[6],
        image: Object.values(user)[7],
        budget: Object.values(user)[9]
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

module.exports = passport;