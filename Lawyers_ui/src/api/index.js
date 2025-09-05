import { useEffect } from "react";
const getPosts=async()=>{
    const response=await fetch("/api/post",{
        method:"GET"
    });

    return await response.json();
}

const addPost=async(payload)=>{
    const formData=new FormData();
    formData.append("title",payload.title);
    formData.append("content",payload.content);
    formData.append("conclusion",payload.conclusion);
    payload.images.map((img)=>{
        formData.append("images",img);
    });
     const res=await fetch("/api/post/add",{
        method:"POST",
        credentials:"include",
        // headers:{
        //     "Content-Type": "application/json"
        // },
        body:formData
     })
     return res;
} 

const getBlogs=async()=>{
    const response=await fetch("/api/blog",{
        method:"GET"
    });

    return await response.json();
}

const addBlog=async(payload)=>{
    const res=await fetch("/api/blog/add",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(payload)
    })
    return res;
    // data=res.json()
}
const deleteBlog=async ()=>{
    const res=await fetch("/api/blog/delete/:blogId",{
        method:"DELETE",
        credentials:"include"
    })
    return res.json();
}
const updateBlog=async (payload)=>{
    const res=fetch("/api/blog/update/:blogId",{
        method:"PUT",
        credentials:"include",
        body:JSON.stringify(payload)
    })
}



const getLogout=async ()=>{
    const res=await fetch("/api/user/logout",{
            method:"POST",
            credentials:"include"
        });
    return await res.json();
}

const getLogin=async (payload)=>{
    const res = await fetch("/api/user/login", {
                method: "POST",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
    return   res;
}

const getRegistered=async(payload)=>{
    const res=await fetch("/api/user/register",{
        method:"POST",
        credentials:"include",
        headers: {
                    "Content-Type": "application/json"
                },
        body:JSON.stringify(payload)
    });
    return res;
}

const AuthStatus=async ()=>{
        try{
    const res=await fetch("/api/user/verify",{
        method:"GET",
        credentials:"include",
    });
    if(!res.ok){
        throw new Error("Not athenticated")
    }
    const data=res.json();
    return {isauthenticated:true, user:data.user}
}catch(err){
    return {isauthenticated:false, user:null}
}
}

export {
    getPosts,
    addPost,
    getBlogs,
    getLogout,
    getLogin,
    getRegistered,
    addBlog,
    deleteBlog,
    updateBlog,
    AuthStatus
}