import React from "react";
import {Link,useNavigate} from "react-router-dom"
import "../boxes/input.css";

function Header({authStatus}){
    const navigate = useNavigate()
    const navItems=[
        { name:'Home',slug: "/",active:authStatus},
        {name:'Login',slug: "/login",active: authStatus},
        { name:'Signup', slug: "/signup", active: authStatus,},
        
        
    ]
    return(
        <>
        <header style={{width:"100vw", backgroundColor:"white"}} className="shadow">
                    <nav style={{display:"flex", width:"100%", justifyContent:"center", position:"fixed", marginTop:"0px"}}>
                        {/* <div style={{width:"100px", backgroundColor:"green",margin:"5px", alignItems:"baseline"}} className="shadow"> */}
                                   <img src="/logo/lawyer.png" alt="" style={{height:"67px",margin:"5px"}}/>
                            {/* </div> */}
                        <ul style={{display:"flex", backgroundColor:"blue", width:"100%",justifyContent:"center" ,marginTop:"0px" , height:"70px"}}  >
                            
                            {navItems.map((item)=>!item.active?
                            (<ul key={item.name} style={{margin:"12px",marginInline:"40px"}}>
                               <button onClick={()=>navigate(item.slug)}
                               >{item.name}</button>
                            </ul>):(null)
                            )}
                        </ul>
                                   <img src="/logo/lawyer.png" alt="" style={{height:"67px",margin:"5px"}}/>
                    </nav>
                </header>
        <header   style={{width:"100vw", backgroundColor:"black", marginTop:"0px" , height:"70px"}} >fakeheader</header>
        </>
    )
}

export default Header