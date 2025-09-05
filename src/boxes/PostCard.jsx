import React from "react";

function PostCard(props) {
    return (
        <>
            <div className="card" style={{ backgroundColor: "green", width: "55vw", margin: "5vw", padding: "50px", paddingBottom: "20px", borderRadius: "7%", paddingTop: "4px" }}>
                <div className="heading" style={{ backgroundColor: "grey", display: "flex", height: "50px" }}>
                    <img src="/logo/lawyer.png" alt="" />

                    <span style={{ fontFamily: "initial", marginLeft: "50px", marginTop: "10px" }}>  User Details {props.index}</span>
                </div>
                <div className="title" style={{ fontFamily: "-moz-initial", fontSize: "larger" }}>
                    <h3>{props.title}</h3>
                </div>
                {/* <div>file of images </div> */}
                {/* <img src={props.img} alt="" /> */}
                <div>
                    {props.img.map((image, index) => {
                        const imagePath = image.startsWith("/public")
                            ? image
                            : image;

                        const fullUrl = `http://localhost:8000${imagePath}`;
                        console.log("image ofpost route",fullUrl)
                        return (
                            <img
                                key={index}
                                src={fullUrl}
                                alt={`Post image ${index}`}
                                style={{ maxWidth: "100%", margin: "10px 0" }}
                            />
                        );
                    })}



                </div>

                <img src="/logo/lawyer.png" alt="" />
                <div className="content" style={{ fontFamily: "cursive" }} >
                    <div>{props.content}</div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam amet labore delectus pariatur sint omnis quas natus, quos illo repudiandae provident animi architecto excepturi ipsum, illum nisi dolorem, id dolor minima est libero ipsam? Fugit, dignissimos! Id non officia accusantium repudiandae magnam, voluptas deleniti natus ullam deserunt saepe itaque doloremque neque dolorum velit nulla placeat quam! Expedita delectus, rem deleniti vel incidunt amet molestias suscipit deserunt et quis. Accusantium, vero qui? Nesciunt, unde. Dolorem impedit magni perferendis earum voluptas, atque, quis sapiente tempore eaque repellat, accusamus enim? Recusandae ullam laborum ab quaerat nobis cupiditate laudantium veniam, magnam, obcaecati eum atque!</p>
                </div>
                <div className="concludion" style={{ fontFamily: "-moz-initial", fontSize: "larger" }}>
                    <h5>{props.conclusion} :)</h5>
                </div>
                <div style={{ backgroundColor: "pink", height: "30px", display: "flex", padding: "3px", fontFamily: "cursive" }}>
                    <button style={{ marginLeft: "30px", backgroundColor: "blue" }} >like</button>
                    <button style={{ marginLeft: "15vw", backgroundColor: "blue" }}>comment</button>
                    <button style={{ marginLeft: "15vw", backgroundColor: "blue" }} >Follow +</button>
                </div>
            </div>
        </>
    )
}

export default PostCard;