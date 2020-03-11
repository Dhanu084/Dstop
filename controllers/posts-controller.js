const Posts = require('../models/posts');
const Comments = require('../models/comments');
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

    return res.redirect('/');
}

module.exports.destroy = function(req,res){
    console.log(req.user.id);
    Posts.findById(req.params.id,function(err,posts){
        //.id to  convert the object id to string
        if(posts.user == req.user.id){
            posts.remove();
            Comments.deleteMany({posts:req.params.id},function(err){
                return res.redirect('back');
            })
        }
        else{
            res.redirect('back');
        }
    })
}