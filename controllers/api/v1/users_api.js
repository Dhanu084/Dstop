const User = require('../../../models/users');
const jwt = require('jsonwebtoken');

module.exports.createSession =  async function(req,res){
    try{
        let user = await User.findOne({email : req.body.email});
        if(!user || user.password!= req.body.password){
            return res.json(422,{
                message:"Invalid username or password"
            });
        }
        return res.json(200,{
            message:"SignIn successful",
            data:{
                token : jwt.sign(user.toJSON(),'dstop',{expiresIn:'100000'})
            }
        })
    }
    catch(error){
        return res.json(500,{
            message : "Internal Server Error"
        });
    }
    
}
