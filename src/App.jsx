import { useState } from 'react'
import './App.scss'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { createBrowserRouter, Router } from 'react-router-dom'
import {Layout, RequireAuthLayout} from "./components/Layout/Layout"
import BlogList from './routes/BlogList/BlogList'
import BlogDetail from './routes/BlogDetail/BlogDetail'
import NewPost from './routes/NewPost/NewPost'
import UpdatePost from './routes/UpdatePost/UpdatePost'
import SignUpPage from './routes/Sign-up Page/SignupPage'
import LoginPage from "./routes/Sign-in Page/LoginPage";
import Profile from './routes/Profile/Profile'
import UpdateProfile from './routes/UpdateProfile/UpdateProfile'


function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <BlogList/>,
        },
        {
          path: "/post/:id",
          element: <BlogDetail/>
        },
        {
          path: "/signup",
          element: <SignUpPage/>
        },
        {
          path: "/login",
          element: <LoginPage/>
        }
      ]
    },
    {
      path: "/",
      element: <RequireAuthLayout/>,
      children: [
        {
          path: "/profile/:id",
          element: <Profile/>
        },
        {
          path: "/updateprofile/:id",
          element: <UpdateProfile/>
        },
        {
          path: "/newblog",
          element: <NewPost/>
        },
        {
          path: "/update/:id",
          element: <UpdatePost/>
        } 
      ]
    }
  ])
  return (
    <RouterProvider router={browserRouter}/>
  )
}

export default App
