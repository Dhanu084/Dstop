const Posts = require('../models/posts');
const User = require('../models/users');
// module.exports.home = function (req,res) {
//     Posts.find({}).populate('user').populate({
//         path:'comments',
//         populate:{
//             path:'user'
//         }
//     }).exec(function(err,posts){
//         //console.log(posts);
//         User.find({},function(err,users){

//             if(err){
//                 console.log(err);
//                 return;
//             }
//             return res.render('home',{
//                 title:'home',
//                 posts:posts,
//                 all_users : users
//             })
//         })
        
//     });
//   }

  module.exports.home = async function (req,res) {
      try{
        let posts = await Posts.find({}).sort('-createdAt')
        .populate('user').populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
    
        let users = await User.find({});
    
        return res.render('home',{
            title:'home',
            posts:posts,
            all_users : users
        })
        
      }
      catch(err){
            console.log(err);
      }
    
  }