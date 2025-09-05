import { addBlog } from "../api"
import "../boxes/input.css";
import { useState } from "react";


function AddBlog() {
    const [qualifications, setQualification] = useState([]);
    const [degree, setDegree] = useState("");
    const [college, setCollege] = useState("");
    const [year, setyear] = useState("");

    const [experinces, setExperiences] = useState([]);
    const [Content, setContent] = useState("");
    const [Place, setPlace] = useState("");
    const [Year, setYear] = useState("");

    const handleQualification = (e) => {
        // e.preventDefault();
        const qualification = {
            degree, college, year
        }
        console.log("in qualification", qualification)
        setQualification([...qualifications, qualification]);
        // qualifications.push([...qualifications, qualification]);

        setCollege("")
        setDegree("")
        setyear("")
    }
    const handleExperince = (e) => {
        // e.preventDefault();
        const experince = {
            content: Content,
            place: Place,
            year: Year
        }
        console.log("in experince", experince)
        setExperiences([...experinces, experince]);
        // experinces.push([...experinces, experince]);
        setContent("")
        setPlace("")
        setYear("")
    }
    // const [createdBy,setCreatedBy]=useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            qualifications,
            experinces
        }
        try {
            const res = await addBlog(payload);
            // const contentType = res.headers.get("content-type")
            // console.log(contentType)
            const data = await res.json();
            console.log(data)
            if (res.ok) alert("blog added succesfully")
            else alert(data.message + "can't add blog")
        } catch (err) {
            console.log("error while adding blog:", err)
            alert("Something went wrong" + err.message)
        }
    }
    //height: "140vh",   sec div- justifyContent: "center", display: "flex", alignItems: "center", 
    return (
        <>
            {/* <div style={{ backgroundColor:"green" }}> */}
                <div style={{ backgroundColor: "darkblue", width: "70vw",display: "flex", width: "70vw" }}>
                    <div style={{ width: "75%", backgroundColor: "blueviolet", margin: "12.5%" }}>
                        <h1>Add your blog</h1>

                        <fieldset>
                            <legend>Qualifications Added</legend>
                            <ul>
                                {qualifications.map((q, i) => (
                                    <li key={i}>degree:{q.degree} from {q.college} in {q.year}</li>
                                ))}
                            </ul>
                        </fieldset>
                        <fieldset>
                            <legend>Experiences Added</legend>
                            <ul>
                                {experinces.map((e, i) => (
                                    <li key={i}>experience:{e.content} at {e.place} in {e.year}</li>
                                ))}
                            </ul>
                        </fieldset>

                        <div style={{ height: "70%", padding: "20px" }}>
                            <form onSubmit={handleSubmit}>

                                <fieldset>
                                    <legend>Add your qualifications</legend>
                                    <input type="text" placeholder="enter your degree" value={degree} className="my-input"
                                        onChange={(e) => { setDegree(e.target.value) }} />

                                    <br />
                                    <input type="text" placeholder="college where you persuid this degree" value={college} className="my-input"
                                        onChange={(e) => { setCollege(e.target.value) }} />
                                    <br />
                                    <input type="text" placeholder="year of completion" value={year} className="my-input"
                                        onChange={(e) => { setyear(e.target.value) }} />
                                    <br />
                                    <button type="button" onClick={(e) => { handleQualification() }}>Add Qualification</button>
                                </fieldset>

                                <fieldset>
                                    <legend>Add your experinces</legend>
                                    <input type="text" placeholder="enter your content of experince" value={Content} onChange={(e) => { setContent(e.target.value) }} className="my-input" />
                                    <br />
                                    <input type="text" placeholder="place where you practised" value={Place} onChange={(e) => { setPlace(e.target.value) }} className="my-input" />
                                    <br />
                                    <input type="text" placeholder="year of practic" value={Year} onChange={(e) => { setYear(e.target.value) }} className="my-input" />
                                    <br />
                                    <button type="button" onClick={(e) => { handleExperince() }}>Add experince</button>
                                </fieldset>
                                <button type="Submit" style={{ marginTop: "20px", backgroundColor: "blue" }}>Add Blog</button>
                            </form>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </>
    )
}

export default AddBlog;