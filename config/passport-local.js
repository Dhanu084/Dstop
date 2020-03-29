const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

//authentication using password
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback : true
},
function(req,email,password,done){
//find an user and establish his identity
    User.findOne({email:email},function(err,user){
        if(err) {
            req.flash('error',err);
            return done(err);
        }
        if(!user || user.password!=password){
            req.flash('error','Invalid Username/password');
            return done(null,false);
        }

        return done(null,user);
    });
}
));

//serializing the user to decide which key is used to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id)
});

//deserializing the user from the key in cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user");
            return done(err);
        }
        return done(null,user);
    });
});

//check if the user is authnticated
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contaisn the current signed in user from the cookies. We are just sending it to locals so that the 
        //it can be using in the views
        console.log(req.user);
        res.locals.user = req.user;

    }
    next();
}
module.exports = passport;