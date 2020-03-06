const User = require('../models/users_schema');

module.exports.profile = function(req,res){
    res.render('user_profile',{
        title:"User Profile"
    });
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"Dstop | SignUp"
    })
}


module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:"Dstop | SignIn"
    })
}

module.exports.create = function(req,res){
    console.log(req.body);
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function (err,user) {
        if(err){
            console.log("Error in signing user and loggin in");
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error in signing user and loggin in");
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
        
      })
}
module.exports.createSession = function(req,res){
    console.log(req.body);
    res.redirect('back');
}