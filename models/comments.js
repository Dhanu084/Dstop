const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Like'
    }]
},{
    timestamps:true
}
)

const Comments = mongoose.model('Comments',commentSchema);
module.exports = Comments;