import UserForm from "modules/user-form/user-form";
import BookingHistory from "pages/booking-history/booking-history";
import Cinema from "pages/cinema/cinema";
import CreateUser from "pages/create-user/create-user";
import MovieSchedule from "pages/movie-schedule/movie-schedule";
import ProfileInfo from "pages/profile-info/profile-info";
import UpdateMovie from "pages/update-movie/update-movie";
import UpdateUser from "pages/update-user/update-user";
import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// import AdminGuard from "../guards/admin.guard";
// import AuthGuard from "../guards/auth.guard";
// import NoAuthGuard from "../guards/no-auth.guard";
// import AdminLayout from "../layouts/admin";
// import HomeLayout from "../layouts/home";
// import Booking from "../pages/booking/booking";
// import Home from "../pages/home/home";
// import Login from "../pages/login/login";
// import MovieDetail from "../pages/movie-detail/movie-detail";
// import MovieManagement from "../pages/movie-management/movie-management";
// import Register from "../pages/register/register";
// import UserManagement from "../pages/user-management/user-management";
// import MovieList from "../pages/movie-list/movie-list";

const HomeLayout = lazy(() => import("../layouts/home"));
const Home = lazy(() => import("pages/home/home"));
const MovieList = lazy(() => import("pages/movie-list/movie-list"));
const MovieDetail = lazy(() => import("pages/movie-detail/movie-detail"));
const Booking = lazy(() => import("pages/booking/booking"));
const Register = lazy(() => import("pages/register/register"));
const Login = lazy(() => import("pages/login/login"));
const AuthGuard = lazy(() => import("../guards/auth.guard"));
const NoAuthGuard = lazy(() => import("../guards/no-auth.guard"));
const AdminGuard = lazy(() => import("../guards/admin.guard"));
const AdminLayout = lazy(() => import("../layouts/admin"));
const UserManagement = lazy(() =>
  import("pages/user-management/user-management")
);
const MovieManagement = lazy(() =>
  import("pages/movie-management/movie-management")
);
const CreateMovie = lazy(() => import("pages/create-movie/create-movie"));

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
          path: "/cinema",
          element: <Cinema />,
        },

        {
          path: "/movie",
          element: <MovieList />,
        },

        {
          path: "/movie/:movieId",
          element: <MovieDetail />,
        },

        {
          path: "/",
          element: <AuthGuard />,
          children: [
            {
              path: "/booking/:showTimesId",
              element: <Booking />,
            },
            {
              path: "/profile-info/:taiKhoan",
              element: <ProfileInfo />,
            },
            {
              path: "/booking-history/:taiKhoan",
              element: <BookingHistory />,
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
            {
              path: "/register",
              element: <Register />,
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
            // {
            //   path: "/admin/",
            //   element: <Navigate to="/admin/user-management" />,
            // },

            {
              path: "/admin/user-management",
              element: <UserManagement />,
            },
            {
              path: "/admin/user-management/create-user",
              element: <CreateUser />,
            },
            {
              path: "/admin/user-management/:taiKhoan/update-user",
              element: <UpdateUser />,
            },
            {
              path: "/admin/movie-management",
              element: <MovieManagement />,
            },
            {
              path: "/admin/movie-management/create-movie",
              element: <CreateMovie />,
            },

            {
              path: "/admin/movie-management/:movieId/update-movie",
              element: <UpdateMovie />,
            },

            {
              path: "/admin/movie-management/:movieId/movie-schedule",
              element: <MovieSchedule />,
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
