import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
//*****************************************8 */
// Top of your ES module file
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const path = require('path');
import path from "path"

const app= express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
// middlewares.........
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
// app.use(express.static("public"))
app.use('/api/post_img', express.static(path.join(__dirname, 'public/post')));


//routes
import userRouter from "./routes/user.js"
import blogRouter from "./routes/blog.js"
// import reviewToBLogRoute from "./routes/reviewBlog.js"
import postRouter from "./routes/post.js"

app.use("/api/user",userRouter);
app.use("/api/blog",blogRouter);
// app.use("/blog/review",reviewToBLogRoute);
app.use("/api/post",postRouter);
// app.use('/post', express.static(path.join(__dirname, 'public/post')));


export {app}