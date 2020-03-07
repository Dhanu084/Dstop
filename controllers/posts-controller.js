const Posts = require('../models/posts');

module.exports.create = function(req,res){
    Posts.create({
        content:req.body.content,
        user:req.user._id
    },function(err){
        if(err){
            console.log("Error in creating post");
            return;
        }
    })

    return res.redirect('back');
}