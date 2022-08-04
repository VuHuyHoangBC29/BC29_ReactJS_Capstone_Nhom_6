import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AdminGuard from "../guards/admin.guard";
import AuthGuard from "../guards/auth.guard";
import NoAuthGuard from "../guards/no-auth.guard";
import AdminLayout from "../layouts/admin";
import HomeLayout from "../layouts/home";
import Booking from "../pages/booking/booking";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import MovieDetail from "../pages/movie-detail/movie-detail";
import MovieManagement from "../pages/movie-management/movie-management";
import Register from "../pages/register/register";
import UserManagement from "../pages/user-management/user-management";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movie/:movieId",
          element: <MovieDetail />,
        },

        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/",
          element: <AuthGuard />,
          children: [
            {
              path: "/booking/:showTimesId",
              element: <Booking />,
            },
          ],
        },
        {
          path: "/",
          element: <NoAuthGuard />,
          children: [
            {
              path: "/login",
              element: <Login />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/",
          element: <AdminGuard />,
          children: [
            {
              path: "/admin/",
              element: <Navigate to="/admin/user-management" />,
            },
            {
              path: "/admin/movie-management",
              element: <MovieManagement />,
            },
            {
              path: "/admin/user-management",
              element: <UserManagement />,
            },
          ],
        },
      ],
    },

    // {
    //   path: "/admin",
    //   element: <AdminLayout />,
    //   children: [
    //     {
    //       path: "/admin/movie-management",
    //       element: <MovieManagement />,
    //     },
    //   ],
    // },
  ]);

  return routing;
}
