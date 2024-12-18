import React from "react";
import Feed from "./Components/Feed";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import "./App.css";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Body from "./Components/Body";
import Watch from "./Components/Watch";
import Category from "./Components/Category";
function App() {
  const approuter=createBrowserRouter([
    {
      path:"/",
      element:<Body/>,
      children:[
        {
          path:"/",
          element:<Feed/>,
        },
        {
          path:"/watch",
          element:<Watch/>
        }
        ,
        {
          path:"/:category",
          element:<Category/>
        }
      ]
    }
  ])
  return (
    <>
      <Navbar />
      <RouterProvider router={approuter}/>
    </>
  );
}

export default App;
