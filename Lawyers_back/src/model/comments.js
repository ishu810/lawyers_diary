import { Schema,model } from "mongoose";

const commentSchema=new Schema({
    content:{
        type:String,
        required:true,
    },
    PostId:{
        type:Schema.Types.ObjectId,
        ref:"Post"       // kis post ke liye comment hai
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"  // btaega kis user ke liye comment hai
    },
},{timestamps:true});

const Comment=model("Comment",commentSchema);
module.exports=Comment;