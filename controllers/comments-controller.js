const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = function (req,res) {
    Post.findById(req.body.post,function(err,post){
        if(post){
            console.log(post)
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
        }
    })
}

module.exports.destroy = function(req,res){
    
   Comment.findById(req.params.id,function(err,comment){
       if(err){
           console.log(err);
           return;
       }
    console.log(comment);
       if(comment.user == req.user.id){
           let post_id = comment.post;
           comment.remove();

           Post.findByIdAndUpdate(post_id,{$pull:{comments:req.params.id}},function(err,post){
               return res.redirect('back');
           });
       }
       else{
           res.redirect('back');
       }
   })
}