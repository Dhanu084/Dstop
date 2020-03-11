const Posts = require('../models/posts');
const Comments = require('../models/comments');
module.exports.create =  async function(req,res){
    try{
    await Posts.create({
        content:req.body.content,
        user:req.user._id
    })
    req.flash('success','post published');
    return res.redirect('/');
    }
    catch(err){
        req.flash('error',err);
        return;
    }
   
    
}

module.exports.destroy = async function(req,res){
    console.log(req.user.id);
    try{
        let posts = await Posts.findById(req.params.id)
        if(posts.user == req.user.id){
            posts.remove();
            await Comments.deleteMany({posts:req.params.id},function(err){
                req.flash('success','post deleted');
                return res.redirect('back');
            })
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