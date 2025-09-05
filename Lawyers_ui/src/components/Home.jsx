import { useState, useEffect } from "react";
import { getPosts } from "../api/index.js";
import PostCard from "../boxes/PostCard.jsx";
import { HomeLeftbar, HomeRightbar } from "../boxes/HomeRightbar.jsx"


function Home() {
    const [posts, setData] = useState(null);

    useEffect(() => {
        getPosts()
            .then((posts) => {
                setData(posts.data)
                console.log(posts)
            })
            .catch((err) => console.log("can't fetch data due to error :", err));
    }, []);

    return (
        <>
            <div style={{ display: "flex", width: "70vw" }}>
                <div style={{ backgroundColor: "gray", alignItems: "center", justifyContent: "center" }}>
                    {!posts ? <p>Network error while fetching posts. Please try again</p> :
                        posts.map((post, index) => (
                            // let filePath ={post.images};
                            // filePath = filePath.replace(/^\/public/, '');
                            <PostCard title={post.title}
                                content={post.content}
                                conclusion={post.conclusion}
                                key={post._id}
                                index={index}
                                img={post.images}
                            />
                        ))}
                </div>
            </div>
        </>
    )
}

export default Home;