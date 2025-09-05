
import { AddBlog,deleteBlog,getAllBLogs,updateBlog,} from "../controlers/blog.js";
import {addReview,deleteReview,getReview,updateReview} from "../controlers/reviewBLog.js"

import { verifyJwt,authorizeRole } from "../middleware/auth.js";

import Router from "express"
const router=Router();

router.route("/").get(verifyJwt,getAllBLogs)                 // verified
router.route("/add").post(verifyJwt,authorizeRole(['lawyer']),AddBlog);        // verified
router.route("/delete/:blogId").delete(verifyJwt,authorizeRole(['lawyer']),deleteBlog);     // verified
router.route("/update/:blogId").put(verifyJwt,authorizeRole(['lawyer']),updateBlog);       // verified

router.route("/review/:blogId").get(getReview)            // verified
router.route("/review/add/:blogId").post(verifyJwt,addReview);     // verified
router.route("/review/delete/:reviewId/:blogId").delete(verifyJwt,deleteReview);   // verified
router.route("/review/update/:reviewId/:blogId").put(verifyJwt,updateReview);      // verified


export default router;