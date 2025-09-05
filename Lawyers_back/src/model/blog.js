import { Schema,model } from "mongoose";

const blogSchema=new Schema({
    Qualifications:[
        {
            degree:{type:String},
            college:{
                        type:String
            },
            year:{type:Number}
        },
        
    ],
    experinces:[
        {
        content:{type:String},
        place:{type:String},
        year:{
            type:Number
        }
        }
    ],
     createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

const Blog=model("Blog",blogSchema);

export default Blog;