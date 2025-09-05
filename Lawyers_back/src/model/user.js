import { Schema,model } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema= new Schema({
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    profilePhoto:{
        type:String,
        default:"/default/profile.png"
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    regNumber:{
        type:String,
        unique:true,
    },
    role:{
        type:String,
        enum:['client','lawyer'],
        default:'client',
    },
    coverImage:{
        type:String
    },
    refreshToken:{
        type:String,

    }
},{timestamps:true});

// bcrypt used in hashing and comparin gpassword.
userSchema.pre('save', async function(next){
     if(!this.isModified('password'))return next();
     this.password=await bcrypt.hash(this.password,10);
     next(); 
})

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

//jwt for making token
userSchema.methods.createAccessToken=function(){
    const payload ={
           _id:this._id,
           email:this.email,
           fullName:this.fullName,
        }
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {
           expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

userSchema.methods.createRefreshToken=function(){
    return jwt.sign(
        {//payload
            _id:this._id,
        },process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



const User=model("User",userSchema);
export {User};