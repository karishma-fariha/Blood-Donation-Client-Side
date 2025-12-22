import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile";
import PrivateRouter from "../Provider/PrivateRouter";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests";
import UpdateDonationRequest from "../Pages/Dashboard/UpdateDonationRequest";
import DonationDetails from "../Pages/Dashboard/DonationDetails";
import AllUsers from "../AdminDashboard/AllUsers";
import Search from "../Pages/Search";
import AllDonationRequests from "../Pages/Dashboard/AllDonationRequests";
import AdminRoute from "./AdminRoute";
import AdminHome from "../AdminDashboard/AdminHome";
import AddBlog from "../VolunteerDashboard/AddBlog";
import ContentManagement from "../VolunteerDashboard/ContentManagement";
import Funding from "../Pages/Funding";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:'search',
        element:<Search></Search>
      },
      {
        path:'donation-requests',
        element:<AllDonationRequests></AllDonationRequests>
      },
      {

        path: "donation-details/:id",
        element: <PrivateRouter><DonationDetails></DonationDetails></PrivateRouter>

      },
      {
        path:'funding',
        element:<PrivateRouter><Funding></Funding></PrivateRouter>
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
    path: '/dashboard',
    element: <PrivateRouter>
      <DashboardLayout></DashboardLayout>
    </PrivateRouter>,
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: 'profile',
        element: <MyProfile></MyProfile>
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>
      },
      {
        path: 'my-donation-requests',
        element: <MyDonationRequests></MyDonationRequests>
      },
      {
        path: 'update-donation-request/:id',
        element: <UpdateDonationRequest></UpdateDonationRequest>
      },
      {
        path:'admin-home',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path:"all-users",
        element:<AllUsers></AllUsers>
      },
      {
        path:"all-donation-requests",
        element:<AllDonationRequests></AllDonationRequests>
      },
      {
        path:"content-management",
        element:<ContentManagement></ContentManagement>
      },
      {
        path:'content-management/add-blog',
        element:<AddBlog></AddBlog>
      }


    ]
  }

]);