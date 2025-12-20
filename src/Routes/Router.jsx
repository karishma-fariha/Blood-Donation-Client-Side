import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      }
    ]
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {

        path: '/register',
        Component: Register

      },

    ]
  },
  {
    path:'/dashboard',
    Component:DashboardLayout,
    children:[
      {
        index: true, 
        Component: MyProfile, 
      },
      {
        path:'profile',
        Component:MyProfile
      }
    ]
  }

]);