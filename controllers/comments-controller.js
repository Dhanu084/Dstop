const Comment = require('../models/comments');
const Post = require('../models/posts');
const commentsMailer = require('../mailers/comments-mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require('../models/like');

module.exports.create = async function(req, res){
    try{
    let post= await Post.findById(req.body.post);

        if (post){
            
           let comment= await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            
            //function(err, comment){
                // handle error
               
                post.comments.push(comment);
                post.save();
                //res.redirect('/');

                comment = await comment.populate('user', 'name email').execPopulate();
                // commentsMailer.newComment(comment);
               let job = queue.create('emails', comment).save(function(err){
                    if(err){
                        console.log('Error in creating the job',err);
                        return;
                    }
                    console.log('job enqueued',job.id);
                });

                if(req.xhr){
                    return res.status(200).json({
                        data: {
                            comment: comments
                        }, 
                        message: "Comment Added"
                    });
    
                }
                req.flash('success','Comment Added');
                res.redirect('/');
        } 
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){
    try{
   let comment= await Comment.findById(req.params.id);
   
        if(comment.user = req.user.id){
            let postId = comment.post;
            comment.remove();

           let post= await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

           await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    }, message: "Comment Deleted Successfully"
                });
            }

            req.flash('success','Comment Deleted Sucessfully');
                return res.redirect('back');
        }
        else{
            req.flash('error','Oops!! Try Again');
            return res.redirect('back');
        }
    }catch(err){
       req.flash('error',err);
        return res.redirect('back');
    }
}