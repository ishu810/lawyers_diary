import { Schema,model } from "mongoose";

const postSchema=new Schema({
   images:[
     String,
   ],
   title:{
   type:String,
    required:true,
    
   },
   content:{
   type:String,
   required:true,

   },
   conclusion:{
      type:String,
      default:"Thank You"
   },
   postBy:{
    type:Schema.Types.ObjectId,
    ref:"User"
   },
   
},{timestamps:true});

const Post=model("Post",postSchema);
export default Post;