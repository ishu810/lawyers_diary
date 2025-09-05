import { getLogout } from "../api";

function Logout(){
    const handleLogout=async ()=>{
        const  data= await getLogout()
        alert(data.message);
    }
    return(
        <>
        <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Logout;