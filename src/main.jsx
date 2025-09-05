import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import Home from './components/Home.jsx'
import HomeOne from './components/HomeOne.jsx'
import Network from "./components/Network.jsx"
import Logout from './components/Logout.jsx'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import AddBlog from './components/AddBlog.jsx'
import AddPost from './components/AddPost.jsx'


import { createBrowserRouter,RouterProvider } from 'react-router-dom'
const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
          {
            path:"",
            element:<HomeOne/>
          }
           ,{
            path:"/all-posts",
            element:<Home/>
          }               
          ,{
            path:"/all-network",
            element:<Network/>
          }
          ,{
            path:"/logout",
            element:<Logout/>
          }
          ,{
            path:"/login",
            element:<Login/>
          },{
            path:"/signup",
            element:<SignUp/>
          }
          ,{
            path:"/add-blog",
            element:<AddBlog/>
          }
          ,{
            path:"/add-post",
            element:<AddPost/>
          }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
