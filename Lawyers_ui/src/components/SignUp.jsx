
import Footer from "./Footer";
import { getRegistered } from "../api";
import "../boxes/input.css";
import { useState } from "react";

function Login() {
    const [fullName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [regNumber,setRegNumber]=useState("");
    const [role,setRole]=useState({
        lawyer:false,
        client:false,
    });
    const [profilePhoto,setProfile]=useState(null);
    const [coverImage,setCoverImg]=useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        const payload = {
            fullName,
            email,
            password,
            regNumber,
            role: role.lawyer || role.client,
            profilePhoto,
            coverImage
        };
        try {

            const res = await getRegistered(payload);
            const data = await res.json();
            if (res.ok) {
                alert("Login successful!");
                // Redirect user, store token, etc.
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Something wrong");
        }
    };

    return (
        <>
            <div style={{
                height: "140vh",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                backgroundColor:"darkblue"
            }}>
                <div style={{
                    height: "80%",
                    width: "70%",
                    backgroundColor: "blueviolet"
                }}>
                    <h1>Register/SignUp</h1>
                    <div style={{
                        // backgroundColor: "blueviolet",
                        height: "70%",
                        padding: "20px"
                    }}>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Enter your user name"
                                value={fullName}
                                onChange={(e) => setName(e.target.value)}
                                className="my-input"
                            />
                            <br />
                            <input
                                type="text"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="my-input"
                            />
                            <br />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="my-input"
                            />
                            <br />
                            <input
                                type="text"
                                placeholder="Enter your registration number"
                                value={regNumber}
                                onChange={(e) => setRegNumber(e.target.value)}
                                className="my-input"
                            />
                            <br />
                            <fieldset>
                                <legend 
                                className="my-label"
                                >Select Roles:</legend>
                                <label>
                                    <input 
                                    type="checkbox"
                                    name="client"
                                    checked={role.client} 
                                    onChange={()=>setRole(!role.client)}
                                    />
                                     Client
                                </label>
                                <br />
                                <label>
                                    <input 
                                    type="checkbox"
                                    name="lawyer"
                                    checked={role.lawyer} 
                                    onChange={()=>setRole(!role.lawyer)}
                                    />
                                    Lawyer
                                </label>
                            </fieldset>
                           <br />
                        <label className="my-label" >Upload Profile Picture:</label>
                        <br />
                        <input type="file"
                        accept="image/*" 
                        className="my-input"
                        onChange={(e)=>{setProfile(e.target.files[0])}}
                        />
                        <br />
                                
                        <label className="my-label" >Upload cover Image:</label>
                        <br />
                        <input
                         type="file"
                        accept="image/*" 
                        className="my-input"
                        onChange={(e)=>{setCoverImg(e.target.files[0])}}
                        />
                        <br/>
                        <button type="submit">Signup</button>
                        </form>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Login;
