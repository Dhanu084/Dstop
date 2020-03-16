const Posts = require('../../../models/posts');
const Comments = require('../../../models/comments');
module.exports.index =  async function (req,res) {
    
        let posts = await Posts.find({}).sort('-createdAt')
        .populate('user').populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
    
    res.json(200,{
        message : "List of Posts"
        ,
        posts : posts
    })
}


module.exports.destroy = async function(req,res){
        
    try{
        let post = await Posts.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comments.deleteMany({post:req.params.id})
           
           // req.flash('success','post deleted');
            return res.json(200,{
                message : "Post and associated comments deleted"
            })
        }
        else{
            return res.json(401,{
                message:"You cannot delete this post"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.json(500,{
            message :  "Internal server error"
        })
    }
   
}