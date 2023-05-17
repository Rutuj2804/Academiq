import { Navigate } from "react-router-dom";

import Home from "../pages/Home/index"
import ForgotPassword from "../pages/auth/ForgotPassword"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import ResetPassword from "../pages/auth/ResetPassword"
import Dashboard from "../pages/dashboard/Dashboard"

export const regularRoutes = [
    { path: "/dashboard", element: <Dashboard /> },

    { path: "/", element: <Navigate to="/dashboard" /> },
]

export const authRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
]