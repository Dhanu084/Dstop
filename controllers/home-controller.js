const Posts = require('../models/posts')
module.exports.home = function (req,res) {
    Posts.find({}).populate('user').exec(function(err,posts){
        //console.log(posts);
        if(err){
            console.log(err);
            return;
        }
        return res.render('home',{
            title:'home',
            posts:posts
        })
    });
  }