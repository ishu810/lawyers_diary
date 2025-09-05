import { addPost } from "../api"
import "../boxes/input.css";
import { useState } from "react";


// function AddPost() {
//     const [images,setImages]=useState([]);
//     const [img,setImg]=useState("");
//     const [title,setTitle]=useState("");
//     const [content,setContent]=useState("")
//     const [conclusion,setConclusion]=useState("")

//     // const handleImage=(e)=>{
//     //     console.log("add img button clicked",img)
//     //     // const selectedFiles=Array.from(e.target.files);
//     //     const selectedFiles=img;
//     //     console.log(images)
//     //     // e.target.files;
//     //     if(images.length>=10){
//     //         alert("max 10 image you can upload");
//     //         return;
//     //     }
//     //     setImges([...images,selectedFiles]);
//     //     console.log(images)

//     //     setImg("")
//     // }
//     const handleImage = e => {
//   const picked = Array.from(e.target.files);
//   if(audio); // limit
//   setImages(prev => [...prev, ...picked.slice(0, 10 - prev.length)]);
// };

//     // const handlesubmit=async(e)=>{
//     //     e.preventDefault();
//     //     const payload={
//     //         images:JSON.stringify(images),
//     //         title,
//     //         content,
//     //         conclusion
//     //     }
//     //     console.log(payload)
//     //     try{
//     //         const res=await addPost(payload);
//     //         const data=await res.json();
//     //         //******************************* */
//     //         console.log("data added",data);
//     //         if(res.ok){
//     //             alert("post added :)");
//     //         }else {
//     //             alert(data.message+"cant'n add post")
//     //               }
//     //     }catch(err){
//     //         console.log("error while posting",err)
//     //         alert("can't post :"+err.message)
//     //     }
//     // }

//     const handlesubmit = async event => {
//   event.preventDefault();

//   const formData = new FormData();
//   formData.append("title", title);
//   formData.append("content", content);
//   formData.append("conclusion", conclusion);
//   images.forEach((file, idx) =>
//     formData.append("images", file, file.name || `image_${idx}`)
//   );

//   // Log entries to make sure files are there
//   for (const [key, val] of formData.entries()) {
//     console.log(key, val);
//   }

//   const res = await fetch("/api/post/add", {
//     method: "POST",
//     credentials: "include",
//     body: formData
//   });

//   // handle response...
// };


//     return (
//         <>
//                 <div style={{ backgroundColor: "darkblue", width: "70vw",display: "flex", width: "70vw"}}>

//                     <div style={{width: "75%", backgroundColor: "violet",margin: "12.5%", padding:"20px"}} className="shadow">
//                         <h1>Add A Post :)</h1>
//                         <div>
//                             <form onSubmit={(e)=>{handlesubmit()}}>
//                                 <fieldset>
//                                     <legend>Add images</legend>
//                                     <input type="file" multiple  
//                                     accept="image/*" 
//                                     onChange={(e)=>(setImg(e.target.files))} className="my-input"/>
//                                     <button type="button" onClick={(e)=>{handleImage()}}>Add : {images.length}/10</button>
//                                 </fieldset>
//                                     <input type="text" placeholder="write your title of content" value={title} onChange={(e)=>(setTitle(e.target.value))} className="my-input"/>
//                                     <input type="text" placeholder="write your content" value={content} onChange={(e)=>(setContent(e.target.value))} className="my-input"/>
//                                     <input type="text" placeholder="add conclusion :)" value={conclusion} onChange={(e)=>(setConclusion(e.target.value))} className="my-input"/>
//                                     <br />
//                                 <button type="submit">Add Post</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//         </>
//     )
// }


function AddPost() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [conclusion, setConclusion] = useState("");

  const handleImage = e => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files.slice(0, 10 - prev.length)]);
  };

  const handlesubmit = async e => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("conclusion", conclusion);
    images.forEach((file) =>
      formData.append("images", file, file.name)
    );

    try {
      const res = await fetch("/api/post/add", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || res.statusText);
      alert("Post added!");
      console.log("Response:", data);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Couldn't post: " + (err.message || String(err)));
    }
  };

  return (
    // <form onSubmit={handlesubmit}>
    //   <input type="file" multiple accept="image/*" onChange={handleImage} />
    //   <p>{images.length} / 10 images selected</p>
    //   <input value={title} onChange={e => setTitle(e.target.value)} required />
    //   <textarea value={content} onChange={e => setContent(e.target.value)} required />
    //   <input value={conclusion} onChange={e => setConclusion(e.target.value)} />
    //   <button type="submit">Add Post</button>
    // </form>
    <>
      <div style={{ backgroundColor: "darkblue", width: "70vw", display: "flex", width: "70vw" }}>

        <div style={{ width: "75%", backgroundColor: "violet", margin: "12.5%", padding: "20px" }} className="shadow">
          <h1>Add A Post :)</h1>
          <div>
            <form onSubmit={handlesubmit}>
              <fieldset>
                <legend>Add images</legend>
                <input type="file" multiple
                  accept="image/*"
                  // onChange={(e) => (setImg(e.target.files))}
                  onChange={handleImage} 
                  className="my-input" />
                  <p>{images.length} / 10 images selected</p>
                {/* <button type="button" onClick={(e) => { handleImage() }}>Add : {images.length}/10</button> */}
              </fieldset>
              <input type="text" placeholder="write your title of content" value={title} onChange={(e) => (setTitle(e.target.value))} className="my-input" />
              <textarea type="text" placeholder="write your content" value={content} onChange={(e) => (setContent(e.target.value))} className="my-input" />
              <input type="text" placeholder="add conclusion :)" value={conclusion} onChange={(e) => (setConclusion(e.target.value))} className="my-input" />
              <br />
              <button type="submit">Add Post</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


export default AddPost;
