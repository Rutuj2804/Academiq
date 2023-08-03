import { Navigate } from "react-router-dom";

import Home from "../pages/home/index";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import Dashboard from "../pages/dashboard/Dashboard";
import Activities from "../pages/activity";
import Calls from "../pages/call";
import Chat from "../pages/chat";
import Classes from "../pages/class";
import Collaborate from "../pages/collaborate";
import Events from "../pages/event";
import Lectures from "../pages/lecture";
import Notes from "../pages/note";
import Schedules from "../pages/schedule";
import RolesDefinition from "../pages/role";
import Assigned from "../pages/role/Assigned";
import DemandLetters from "../pages/demand";
import Library from "../pages/library";
import AddActivity from "../pages/activity/AddActivity";
import AddClass from "../pages/class/AddClass";
import AddLecture from "../pages/lecture/AddLecture";
import AddDemand from "../pages/demand/AddDemand";
import AddRoleDefinition from "../pages/role/AddRoleDefinition";
import AddBooks from "../pages/library/AddBooks";
import Profile from "../pages/profile";
import EditProfile from "../pages/profile/Edit";
import ChangePassword from "../pages/profile/ChangePassword";
import CreateUniversity from "../pages/university/Create";
import University from "../pages/university";
import Timetable from "../pages/timetable";
import Logout from "../pages/auth/Logout";
import Student from "../pages/student";
import Faculty from "../pages/faculty";
import Staff from "../pages/staff";
import Courses from "../pages/course";

export const regularRoutes = [
    { path: "/dashboard", element: <Dashboard /> },

    { path: "/activities", element: <Activities /> },
    { path: "/activities/add", element: <AddActivity /> },

    { path: "/calls", element: <Calls /> },

    { path: "/chat", element: <Chat /> },

    { path: "/classes", element: <Classes /> },
    { path: "/classes/add", element: <AddClass /> },

    { path: "/courses", element: <Courses /> },

    { path: "/collaborate", element: <Collaborate /> },

    { path: "/events", element: <Events /> },

    { path: "/lectures", element: <Lectures /> },
    { path: "/lectures/add", element: <AddLecture /> },

    { path: "/notes", element: <Notes /> },

    { path: "/demand-letters", element: <DemandLetters /> },
    { path: "/demand-letters/add", element: <AddDemand /> },

    { path: "/schedules", element: <Schedules /> },

    { path: "/roles", element: <RolesDefinition /> },
    { path: "/roles/add", element: <AddRoleDefinition /> },

    { path: "/assigned", element: <Assigned /> },

    { path: "/library", element: <Library /> },
    { path: "/library/add", element: <AddBooks /> },

    { path: "/timetable", element: <Timetable /> },

    { path: "/students", element: <Student /> },
    { path: "/faculties", element: <Faculty /> },
    { path: "/staffs", element: <Staff /> },

    { path: "/change-password", element: <ChangePassword /> },
    { path: "/edit/:username", element: <EditProfile /> },
    { path: "/:username", element: <Profile /> },

    { path: "/", element: <Navigate to="/dashboard" /> },
];

export const authRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "/logout", element: <Logout /> },

    { path: "/university/create", element: <CreateUniversity /> },
    { path: "/university/:name", element: <University /> },
];
