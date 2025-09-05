import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import Review from "../model/review.js";


const addReview=asyncHandler(async (req,res)=>{
      const {blogId}=req.params;
      const {content} =req.body;

      if(!content){
        throw new ApiError(400,"please write your review then submit")
      }

      const review=await Review.create({
        content,
        reviewAtBlog:blogId,
        reviewBy:req.user._id,
      });

      const createdReview=await Review.findById(review._id);
      if(!createdReview){
        throw new ApiError(400, "can't add review")
      }
      return res
      .status(200)
      .json(new ApiResponse(
        200,
        createdReview,
        "review added"
      ));
})


const deleteReview=asyncHandler(async (req,res)=>{
      const {reviewId}=req.params;
      const review=await Review.findById(reviewId);
      if(!review){
        throw new ApiError(400,"your review not found")
      }
      if(review.reviewBy.toString()!==req.user._id.toString()){
          throw new ApiError(400,"you are not authorised to delete this review")
      }
      await Review.findByIdAndDelete(reviewId);
      //or use findOneAnddelete to reduce the length of code

      return res
      .status(200)
      .json(new ApiResponse(
        200,
        {},
        "review deleted successfully"
      ));
})

const updateReview=asyncHandler(async (req,res)=>{
    const {reviewId}=req.params;
    const {blogId} =req.params;
    const {content}=req.body;
    if(!content){
        throw new ApiError(400,"to submit please write your review")
    }
    const updatedReview=await Review.findOneAndUpdate(
        {
            _id:reviewId,
            reviewBy:req.user._id,
        },{
           content:content,
           reviewAtBlog:blogId,
           reviewBy:req.user._id
        },
        {
            new:true,
            runValidators:true
        }
    );
    console.log(content)
    console.log(updatedReview)

    if(!updatedReview){
        throw new ApiError(400,"can't edit your review")
    }
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        updatedReview,
        "edited the review successfully"
    ));
})

const getReview=asyncHandler(async (req,res)=>{
    const {blogId} =req.params;
    const reviews= await Review.find({reviewAtBlog:blogId});
    if(!reviews){
      throw new ApiError(400,"reviews not found")
    }
    console.log(reviews)
    return res
    .status(200)
    .json(new ApiResponse(
      200,
      reviews,
      "got all reviews successfully"
    ));
})

export {
    addReview,
    deleteReview,
    updateReview,
    getReview
}