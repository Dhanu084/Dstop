const Posts = require('../models/posts');
const Comments = require('../models/comments');
module.exports.create =  async function(req,res){
    try{
    let posts = await Posts.create({
        content:req.body.content,
        user:req.user._id
    })
    if(req.xhr){
        return res.status(200).json({
            data:{
                posts:posts
            },
            message:"Post Created"
        })
    }
    
    req.flash('success','post published');
    return res.redirect('/');
    }
    catch(err){
        req.flash('error',err);
        return;
    }
   
    
}

module.exports.destroy = async function(req,res){
        
    try{
        let post = await Posts.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comments.deleteMany({post:req.params.id})
           
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post Deleted"
                })
            }
            req.flash('success','post deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error','post cannot be deleted');
            res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
    }
   
}