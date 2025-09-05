import { Schema,model } from "mongoose";

const reviewSchema= new Schema({
    content:{
        type:String,
        requred:true
    },
    reviewAtBlog:{
        type:Schema.Types.ObjectId,
        ref:"Blog"
    },
    reviewBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Review=model("Review",reviewSchema);

export default Review;