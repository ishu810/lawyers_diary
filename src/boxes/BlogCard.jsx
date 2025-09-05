
function BlogCard(props) {
    return (
        <>
            <div style={{
                width: "50vw", backgroundColor: "blueviolet", margin: "2.5vw", marginLeft: "10vw", marginRight: "10vw",padding:"10px",borderRadius:"5%"
                // ,borderWidth:"10px",borderBlockColor:"-moz-initial"
            }}>
                <div className="heading" style={{ backgroundColor: "pink", display: "flex", height: "50px" }}>
                    <img src="/logo/lawyer.png" alt="" />
                    <span style={{ fontFamily: "initial", marginLeft: "50px", marginTop: "10px" }}>  User Details {props.index}</span>
                </div>
                {/* <h2>i am {props.createdBy}</h2> */}
                {/* <h3>{props.createdBy.role}</h3> */}
                <fieldset>
                    <legend><h3 style={{ color: "black" }}>Qualifications:</h3></legend>
                    {!props.qualifications ? <p>cant't fetch qualification</p> : (props.qualifications.map((qualification, key) => (
                        <div >
                            <span style={{ fontFamily: "cursive" }}>{qualification.degree}</span>
                            <br />
                            <span style={{ fontSize: "larger", fontFamily: "-moz-initial" }}> College: {qualification.college} || Year: {qualification.year}</span>
                        </div>

                    )))}
                </fieldset>
                <fieldset>
                    <legend><h3 style={{ color: "black" }}>Experince:</h3></legend>
                    {!props.experinces ? <p>can't fetch experince</p> : (props.experinces.map((experince, key) => (
                        <div>
                            <span style={{ fontFamily: "cursive" }} >{experince.content}</span>
                            <br />
                            <span style={{ fontSize: "larger", fontFamily: "-moz-initial" }} >At: {experince.place} || Year: {experince.year}</span>
                        </div>
                    )))}
                </fieldset>
                <div style={{backgroundColor:"pink",height:"30px" ,display:"flex",padding:"3px",fontFamily:"cursive"}}>
                     <button style={{marginLeft:"106px",backgroundColor:"blue"}} >like</button>
                     <button style={{marginLeft:"8vw",backgroundColor:"blue"}}>Review +</button>
                     <button style={{marginLeft:"8vw",backgroundColor:"blue"}} >Follow +</button>
                </div>
            </div>
        </>
    )
}

export default BlogCard