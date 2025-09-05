import { User } from "../model/user.js";
import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken"


const verifyJwt=asyncHandler(async (req,res,next)=>{
    try{
    const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
        // console.log(token);

    if(!token){
        throw new ApiError(400,"Unauthorised request");
    }
    const payload=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    const user= await User.findById(payload?._id).select("-password -refreshToken");
    if(!user){
        throw new ApiError(404,"invalid token")
    }
    console.log("jwt verified");
    // console.log(user)
    req.user=user;
     next();
    }catch(err){
       throw new ApiError (400,err?.message || "error while verifying token")
    }
})


const authorizeRole=(allowedRole=[])=>{
     try{
        return (req,res,next)=>{
            if(!allowedRole.includes(req.user.role)){
                throw new ApiError(400,"user not authorised")
            }
            console.log("user is authorised")
            next();
        }
     }catch(err){
        throw new ApiError(400,err.message|| "can't authorise role")
     }
}

export  {verifyJwt,authorizeRole}