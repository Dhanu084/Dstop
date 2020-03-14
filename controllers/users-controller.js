const User = require('../models/users');
const fs = require('fs');
const path = require('path');

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
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req,res) {
    req.logOut();
    req.flash('success','Logged out Successfully');
    return res.redirect('/');
  }

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         res.redirect('back');
    //     })
    // }
    // else{
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.user.id == req.params.id){
        try{
            let user =  await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log(err+" "+"multer error");
                    return;
                }
                console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar))){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar = User.avatarPath + '/'+req.file.filename;
                }
                user.save();
                res.redirect('back');
            });
        }
        catch(error){
            req.flash('error',error);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error','Unathorized');
        return res.status(401).send('Unauthorized');
    }
}