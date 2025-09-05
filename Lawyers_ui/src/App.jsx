import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { HomeLeftbar, HomeRightbar } from "./boxes/HomeRightbar.jsx"

import { AuthStatus } from "./api/index.js"
import { useEffect, useState } from 'react'
function App() {
  const [auth, setAuth] = useState({ authStatus: false, user: null })
  useEffect(() => {
    (async () => {
      const result = await AuthStatus();
      setAuth(result)
    })()
  }, [])

     console.log("in app function",auth)
     
  if (auth.isauthenticated) {
    return (
      <>
        <div><Header authStatus={auth.isauthenticated} /></div>

        <div style={{ display: "flex", backgroundColor: "pink", width: "100vw" }}>

          <div style={{ backgroundColor: "red", width: "15vw" }}>
            <div style={{ position: "fixed", width: "15vw", backgroundColor: "blueviolet", height: "100%", cursor: "pointer", zIndex: "5" }}>
              <HomeRightbar authStatus={auth.isauthenticated} />
            </div>

          </div>
          <div style={{ width: "70vw" }}>
            <Outlet />
          </div>

          <div style={{ backgroundColor: "red", width: "0vw", position: "" }}>
            <div style={{ position: "fixed", width: "15vw", backgroundColor: "blueviolet", height: "100%", cursor: "pointer", zIndex: "5" }}>
              <HomeLeftbar authStatus={auth.isauthenticated} />
            </div>
          </div>

        </div>
      </>
    )
  }
  else {
    return (
      <>
        <Header authStatus={auth.isauthenticated} />
                       <Outlet />
                       <Footer/>
      </>
    )
  }
}

export default App
