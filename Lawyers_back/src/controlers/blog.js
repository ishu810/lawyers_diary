import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import Blog from "../model/blog.js";


const AddBlog=asyncHandler(async (req,res)=>{
    const {qualifications,experinces} = req.body;
    console.log("blog received",req.body)
    const blog=await Blog.create({
    Qualifications:   qualifications.map((qualification)=>({
            degree : qualification.degree,
            college: qualification.college,
            year:qualification.year
    })),
    experinces: experinces.map((exp)=>({
        content:exp.content,
        place:exp.place,
        year:exp.year
    })),
    createdBy:req.user._id,
});

console.log(blog);
 return res
 .status(201)
 .json(
    new ApiResponse(
        201,
        blog,
        "Blog created",
    )
 )
})

const deleteBlog=asyncHandler(async (req,res)=>{
    const id=req.params.blogId;

    // const blog=await Blog.findById(id);
    // if(!blog){
    //     throw new ApiError(404, "blog not found");
    // }

    // if(blog.createdBy.toString()!==req.user._id.toString()){
    //     throw new ApiError(404,"unauthorised to delete blog")
    // }
    // await Blog.findByIdAndDelete(id);

    const deletedBlog=await Blog.findOneAndDelete({
        _id:id,
        createdBy:req.user._id  //to ensure owner
    });

    if(!deleteBlog){
        throw new ApiError(404,"blog not found or you are not authorised")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,{},"your blog deleted successfully"));
})

const updateBlog= asyncHandler(async (req,res)=>{
    const id=req.params.blogId;
    const {Qualifications,experinces} =req.body;

    const blog=await Blog.findById(id);
    if(!blog){
        throw new ApiError(400, "blog not found");
    }
    if(blog.createdBy.toString()!==req.user._id.toString()){
        throw new ApiError (400,"user not authorised to update")
    }

    blog.Qualifications=Qualifications.map((qualification)=>({
        degree : qualification.degree,
            college: qualification.college,
            year:qualification.year
    }));

   blog.experinces=experinces.map((exp)=>({
        content:exp.content,
        place:exp.place,
        year:exp.year
    }));
    await blog.save();
    // const updatedBlog= await Blog.findOneAndUpdate(
    //     {
    //         _id:id,
    //         createdBy:req.user._id
    //     },
    //     {
    //         Qualifications:   Qualifications.map((qualification)=>({
    //         degree : qualification.degree,
    //         college: qualification.college,
    //         year:qualification.year
    //         })),
    //         experinces: experinces.map((exp)=>({
    //         content:exp.content,
    //         place:exp.place,
    //         year:exp.year
    //         })),
    //     },
    //     {
    //         new:true,
    //         runValidators:true
    //     }
    // );
    // if(!updatedBlog){
    //     return res
    //     .status(404)
    //     .json(new ApiResponse(404,{},"blog not updated"))
    // }
    return res
    .status(200)
    .json(
        new ApiResponse(200,blog,"your blog updatedsuccessfully")
    );
})

const getAllBLogs=asyncHandler(async (req,res)=>{
      const blogs=await Blog.find({})

      if(!blogs){
        throw new ApiError(400,"can't fetch blogs").populate("createdBy","name email")
      }
    //   console.log(typeof (blogs));
    //   console.log((blogs));
      return res
      .status(200)
      .json(new ApiResponse(
        201,
        blogs,
        "blog fetched successfully"
      ));
})


export {
    AddBlog,
    deleteBlog,
    updateBlog,
    getAllBLogs,

}