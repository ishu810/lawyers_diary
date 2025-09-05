import Post from "../model/post.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";


const addPost=asyncHandler(async (req,res)=>{
    console.log("in post controler")
    const{title,content,conclusion}=req.body;

    if(!(title&&content)){
        throw new ApiError(400,"title and content both required")
    }
//     const profilePhotoLocalPath=req.files?.profilePhoto[0]?.filename;
// `/upload/${profilePhotoLocalPath}`

    const imagesLocalPath=req.files?.map(file=>`/post/${file.filename}`) || [];

    const post=await Post.create({
        title,
        content,
        conclusion,
        postBy:req.user._id,
        // images:`/post/${ImagesLocalPath}`||"",  // check 
        // images:imagesLocalPath || []
        images:imagesLocalPath?.length ? imagesLocalPath : []  //it is an array
    })
    const createdPost=await Post.findById(post._id);
    if(!createdPost){
        throw new ApiError(400,"can't create post in database")
    }
    console.log("post created",createdPost)
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        createdPost,
        "post created"
    ))
});

const updatePost=asyncHandler(async (req,res)=>{
    const userId=req.user._id;
    const {title,content,conclusion}=req.body;

    const {postId}=req.params;
    const post =await Post.findById(postId);
    if(!post){
        throw new ApiError(400,"post to be upadated is not found")
    }

    if(post.postBy.toString()!==userId.toString()){
        throw new ApiError(400,"not authorised to update post")
    }
    post.title=title;
    post.conclusion=conclusion;
    post.content=content;
    post.save()
    // const updatedPost=await Post.findOneAndUpdate(
    //     {
    //         _id:req.params.postId,
    //         postBy:userId
    //     },{
            //  $set{
    //         title,content,conclusion,
            //  }
    //     },{
    //         new:true,
    //         runValidators:true
    //     }
    // );


    // const updatedPost=await Post.find(
    //     {
            
    //     }
    // )
    // if(!updatePost){
    //     throw new ApiError(400,"can't update your post")
    // }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        updatePost,
        "post updated succefully"
    ))
});

const deletePost=asyncHandler(async (req,res)=>{
    const deletedPost=await Post.findOneAndDelete({
        _id:req.params.postId,
         postBy:req.user._id,
    })
    if(!deletePost){
        throw new ApiError(400,"post not found")
    }
    const post =await Post.findById(req.params.postId)
    if(post){
        throw new ApiError(400,"can't delete post")

    }
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "post deleted successfully"
    ))
});

const getPost=asyncHandler(async (req,res)=>{
    const posts=await Post.find({})
    if(!posts){
        throw new ApiError(400,"can't fetch blogs")
    }
    return res
    .status(201)
    .json(new ApiResponse(
        201,
        posts,
        "success"
    ))
});

export {
    addPost,
    updatePost,
    deletePost,
    getPost,
}