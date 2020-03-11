const Comment = require('../models/comments');
const Post = require('../models/posts');

// module.exports.create = function (req,res) {
//     Post.findById(req.body.post,function(err,post){
//         if(post){
//             console.log(post)
//             Comment.create({
//                 content:req.body.content,
//                 post:req.body.post,
//                 user:req.user._id
//             },function(err,comment){
//                 post.comments.push(comment);
//                 post.save();
//                 res.redirect('/');
//             })
//         }
//     })
// }
module.exports.create = async function (req,res) {
    try{
        let post = await Post.findById(req.body.post);
        if(post){
        console.log(post)
        let comment = await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        });
        post.comments.push(comment);
            post.save();
            req.flash('success','comment added');
            res.redirect('/');
        }
    }
    catch(err){
        req.flash('error',err);
        console.log(err);
    }
    
}

// module.exports.destroy = function(req,res){
    
//    Comment.findById(req.params.id,function(err,comment){
//        if(err){
//            console.log(err);
//            return;
//        }
//     console.log(comment);
//        if(comment.user == req.user.id){
//            let post_id = comment.post;
//            comment.remove();

//            Post.findByIdAndUpdate(post_id,{$pull:{comments:req.params.id}},function(err,post){
//                return res.redirect('back');
//            });
//        }
//        else{
//            res.redirect('back');
//        }
//    })
// }
module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
    if(comment.user == req.user.id){
        let post_id = comment.post;
        comment.remove();

        Post.findByIdAndUpdate(post_id,{$pull:{comments:req.params.id}});
        req.flash('success','comment deleted');
        return res.redirect('back');
    }
    else{
        req.flash('error',err);
        res.redirect('back');
    }
    }
    catch(err){
        console.log(err);
    }
    
 }