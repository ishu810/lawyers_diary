import mongoose from "mongoose";
const DB_name="Lawyers_Diary";
const connectDB=async ()=>{
    try{
    await mongoose
    .connect(`${process.env.MONGODB_URI}${DB_name}`);
    console.log("mongodb connected")
    }catch(err){
        console.log(`can't connect mongodb due to err: ${err}`)
    }
}

export default connectDB