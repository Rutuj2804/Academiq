import { Navigate } from "react-router-dom";

import Home from "../pages/Home/index";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import Dashboard from "../pages/dashboard/Dashboard";
import Activities from "../pages/activities";
import Calls from "../pages/calls";
import Chat from "../pages/chat";
import Classes from "../pages/classes";
import Collaborate from "../pages/collaborate";
import Events from "../pages/events";
import Lectures from "../pages/lectures";
import Notes from "../pages/notes";
import Schedules from "../pages/schedules";
import RolesDefinition from "../pages/roles";
import Assigned from "../pages/roles/Assigned";
import DemandLetters from "../pages/demands";
import Library from "../pages/library";

export const regularRoutes = [
    { path: "/dashboard", element: <Dashboard /> },

    { path: "/activities", element: <Activities /> },

    { path: "/calls", element: <Calls /> },

    { path: "/chat", element: <Chat /> },

    { path: "/classes", element: <Classes /> },

    { path: "/collaborate", element: <Collaborate /> },

    { path: "/events", element: <Events /> },

    { path: "/lectures", element: <Lectures /> },

    { path: "/notes", element: <Notes /> },

    { path: "/demand-letters", element: <DemandLetters /> },

    { path: "/schedules", element: <Schedules /> },

    { path: "/roles", element: <RolesDefinition /> },

    { path: "/assigned", element: <Assigned /> },

    { path: "/library", element: <Library /> },

    { path: "/", element: <Navigate to="/dashboard" /> },
];

export const authRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
];
