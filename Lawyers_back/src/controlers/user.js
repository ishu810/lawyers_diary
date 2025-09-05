import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../model/user.js";
import { ApiError } from "../utils/ApiErrors.js";



const generateAccessAndRefreshTokens=async function(userId){
    try{
        const user= await User.findById(userId);
    if(!user){
        throw new ApiError(401,"user not found while generating token")
    };

    const genrefreshToken=await user.createRefreshToken();

    const genAccessToken=await user.createAccessToken();
    user.refreshToken=genrefreshToken;
    await user.save({ validateBeforeSave: false });
    // console.log(genrefreshToken)
    // console.log(genAccessToken)
    console.log("Tokens generated");

    return {genrefreshToken,genAccessToken}
    }catch(err){
        console.log(`err while generation tokens :${err}`);
        throw new ApiError(400, `err while generation tokens`);
    }

}

const registerUser=asyncHandler(async function(req,res){
    const {fullName,password,email,regNumber,role}=req.body;
    if(!(fullName&&password&&email)){
        throw new ApiError(400,"all fields are required")
    }
    const existedUser=await User.findOne({
        $or:[{email},{regNumber}]
    })
    if(existedUser){
        throw new ApiError(409,"user already exst please login now")
    }
    // const coverImageLocalPath=req.files?.coverImage[0]?.path;
    // const profilePhotoLocalPath=req.files?.profilePhoto[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.filename;
    const profilePhotoLocalPath=req.files?.profilePhoto[0]?.filename;

    const user=await User.create({
        email,password,fullName,
        regNumber: regNumber,
        coverImage: `/upload/${coverImageLocalPath}`,
        profilePhoto:`/upload/${profilePhotoLocalPath}`,
        role:role ||'client'
    })
    const regesteredUser= await User.findById(user._id).select("-password -refreshToken");
    if(!regesteredUser){
        throw new ApiError(400,"can't register you plese try again")
    }
    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            regesteredUser,
            "you registration has been done successfully"
        )
    );
})

const loginUser=asyncHandler(async (req,res)=>{
    const {email,password,regNumber}=req.body;

    if(!(regNumber || email)){
        throw new ApiError(400,"regNumber or email required")
    }
    const user=await User.findOne({
        $or:[{email},{regNumber}]
    });
     if(!user){
        throw new ApiError(201,"please registere first")
    }
    const isPasswordCorrect= user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new ApiError(400,"incorrect password.please entre correct Password");
    }
    const loggedInUser=await User.findById(user._id);
    const {genrefreshToken,genAccessToken}=await generateAccessAndRefreshTokens(user._id); // await lgana bhul gye to cookie generate hi nhi huaa
    const options={
        httpOnly:true,
        secure:true
    }
    // console.log(genrefreshToken)
    // console.log(genAccessToken)

    return res
    .status(200)
    .cookie("accessToken",genAccessToken,options)
    .cookie("refreshToken",genrefreshToken,options)
    .json(
        new ApiResponse(200,{user:loggedInUser,genrefreshToken,genAccessToken},"user logged in successfully")
    )
});

const logoutUser=asyncHandler(async (req,res)=>{
    const user=req.user;
    // console.log("hiii......")
    if(!user){
        throw new ApiError(400,"not authenticated user")
    }
    await User.findByIdAndUpdate(user._id,{
        $set:{
            refreshToken:undefined
        }
    },{new:true})

 const options={
        httpOnly:true,
        secure:true
    }

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"user logged out"))
});



export {
    registerUser,
    loginUser,
    logoutUser
}