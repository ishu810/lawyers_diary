
import Footer from "./Footer";
import { getLogin } from "../api";
import "../boxes/input.css";
import { useState } from "react";

function Login() {
    const [userName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        const payload = {
            userName,
            email,
            password,
        };
        try {

            const res = await getLogin(payload);
            const data=await res.json();
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
            <div style={{height: "90vh",justifyContent: "center",display: "flex",alignItems: "center",backgroundColor:"darkblue"}}>
                <div style={{height: "75%",width: "70%", backgroundColor:"blueviolet"}}>

                    <h1>Login</h1>

                    <div style={{height: "70%",padding: "20px"}}>
                        
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Enter your user name"
                                value={userName}
                                onChange={(e) => setName(e.target.value)}
                                className="my-input"
                            />
                            {/* <br /> */}
                            {/* <h4>or</h4> */}
                            <input
                                type="text"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="my-input"
                            />
                            {/* <br /> */}
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="my-input"
                            />
                            <br />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Login;
