import { upload } from "../middleware/multer.js";
import Router from "express"
import {loginUser, registerUser,logoutUser} from "../controlers/user.js"
const router = Router();
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";


router.route("/register").post(upload.fields([
    {
        name:"coverImage",
        maxCount:1
    },{
        name:"profilePhoto",
        maxCount:1
    }
]),registerUser);

import {verifyJwt} from "../middleware/auth.js"
router.route("/login").post(loginUser);


router.route("/logout").post(verifyJwt,logoutUser);
router.route("/verify").get(verifyJwt,async (req,res)=>{
    if(!req.user){
          throw new ApiError(401,"Unauthorized")
    }
    try{
        const user=req.user
        return res.json(new ApiResponse(200,user,"Authorised"))
    }catch(err){
          throw new ApiError(401,"Invalid token")
    }
})




export default router