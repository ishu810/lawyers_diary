import {useState,useEffect} from "react"
import { getBlogs } from "../api/index.js"
import BlogCard from "../boxes/BlogCard.jsx";
import {HomeLeftbar,HomeRightbar} from "../boxes/HomeRightbar.jsx"


function Network(){
    const [blogs,setBlogs]=useState("");
    useEffect(()=>{
        getBlogs()
        .then((allBlog)=>{
            console.log("blogs are:",allBlog.data);
              setBlogs(allBlog.data)
        })
        .catch((err)=> console.log("can't fetch users due to :",err))
    },[]);

    return(
        <>
        <div style={{width:"70vw",backgroundColor:"gray"}}>
            <h1>Lets see your lawyer's qualification and experinces :)</h1>
        <div style={{backgroundColor:"gray",width:"65"}}>
            {!blogs? <p>network error while fetching blogs please try again</p>:
           (blogs.map((blog,key)=>(
                <BlogCard key={key} qualifications={blog.Qualifications} experinces={blog.experinces} />
           )))}
        </div>
            </div>
        </>
    )
}

export default Network