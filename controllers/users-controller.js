const User = require('../models/users');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        res.render('user_profile',{
            title:"User Profile",
            profile_user:user
        });
    })
    
}

module.exports.signUp = function(req,res){
   if(req.isAuthenticated()){
       return res.redirect('/');
   }
   else{
    return res.render('user_sign_up',{
        title:'Dstop | User sign up'
    })
   }
   
}


module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    else{
     return res.render('user_sign_in',{
         title:"Dstop | SignIn"
     })
    }
}

module.exports.create = function(req,res){
    // console.log(req.body);
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
            return res.redirect('/');
        }
        
      })
}
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function (req,res) {
    req.logOut();
    return res.redirect('/');
  }

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            res.redirect('back');
        })
    }
    else{
        return res.status(401).send('Unauthorized');
    }
    
}