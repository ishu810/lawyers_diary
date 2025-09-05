import {Router} from "express"
import { authorizeRole, verifyJwt } from "../middleware/auth.js";
import { addPost, deletePost, getPost, updatePost } from "../controlers/post.js";
const router=Router();
import { uploadPost } from "../middleware/multer.js";



router.route("/").get(verifyJwt,getPost);

router.route("/add").post(verifyJwt,
    // authorizeRole(['lawyer']),
    uploadPost.array('images',10),addPost);

router.route("/delete/:postId").delete(verifyJwt,authorizeRole(['lawyer']),deletePost);
router.route("/update/:postId").put(verifyJwt,authorizeRole(['lawyer']),updatePost);


export default router