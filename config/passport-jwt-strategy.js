const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'dstop'
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function (error,user) {
        if(error){
            console.log("Error in finding user from JWT");
            return;
        }
        if(user)
        return done(null,user);
        else return done(null,false); 
    })
}));

module.exports = passport;
