import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout';
import ErrorPage from './Pages/ErrorPage';
import Home from './Pages/Home'
import PostDetail from './Pages/PostDetail'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Logout from './Pages/Logout'
import UserProfile from './Pages/UserProfile'
import Authors from './Pages/Authors';
import CreatePost from './Pages/CreatePost';
import EditPost from './Pages/EditPost';
import CategoryPosts from './Pages/CategoryPosts';
import Dashboard from './Pages/Dashboard';
import DeltePost from './Pages/DeletePost';
import AuthorsPosts from './Pages/AuthorPosts';
import UserProvider from './context/userContext';




const router = createBrowserRouter([
  {
path:"/",
element:<UserProvider><Layout/></UserProvider>,
errorElement: <ErrorPage/>,
children:[
  {index: true, element:<Home />},
  {path: "posts/:id", element:<PostDetail/>},
  {path: "register", element:<Register/>},
  {path: "login", element:<Login/>},
  {path: "logout", element:<Logout/>},
  {path: "profile/:id", element:<UserProfile/>},
  {path: "authors", element:<Authors/>},
  {path: "create", element:<CreatePost/>},
  {path: "posts/users/:id", element:<AuthorsPosts/>},
  {path: "posts/:id/edit", element:<EditPost/>},
  {path: "posts/categories/:category", element:<CategoryPosts/>},
  {path: "posts/:id/delete", element:<DeltePost/>},
  {path: "myposts/:id", element:<Dashboard/>},

]

  }

])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}/> 
  </React.StrictMode>
);

