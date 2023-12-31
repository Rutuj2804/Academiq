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
import ClassDetailView from "../pages/class/DetailView";
import CreateStudent from "../pages/student/CreateStudent";
import CreateFaculty from "../pages/faculty/CreateFaculty";
import CreateStaff from "../pages/staff/CreateStaff";
import CreateCourse from "../pages/course/CreateCourse";
import CourseAssignment from "../pages/assignment/Course";
import FacultyAssignment from "../pages/assignment/Faculty";
import AddSubmission from "../pages/activity/AddSubmission";
import ActivityDetailView from "../pages/activity/DetailView";
import DetailActivitySubmission from "../pages/activity/DetailActivitySubmission";
import DetailCourseView from "../pages/course/DetailCourseView";
import Demand from "../pages/configuration/Demand";
import Basic from "../pages/configuration";
import AddNewDemandType from "../pages/configuration/AddNewDemandType";
import AddResponse from "../pages/demand/AddResponse";
import Placements from "../pages/placement";
import MyApplications from "../pages/placement/MyApplications";
import MyJobs from "../pages/placement/MyJobs";
import ScheduleEvent from "../pages/schedule/ScheduleEvent";
import AddEventPost from "../pages/event/AddEventPost";

export const regularRoutes = [
    { path: "/dashboard", element: <Dashboard /> },

    { path: "/activities", element: <Activities /> },
    { path: "/activity/sub/:id", element: <DetailActivitySubmission /> },
    { path: "/activity/:id", element: <ActivityDetailView /> },
    { path: "/activities/add", element: <AddActivity /> },
    { path: "/activities/submission/:id", element: <AddSubmission /> },

    { path: "/calls", element: <Calls /> },

    { path: "/chat", element: <Chat /> },

    { path: "/classes", element: <Classes /> },
    { path: "/classes/add", element: <AddClass /> },
    { path: "/class/update/:id", element: <AddClass /> },
    { path: "/class/:id", element: <ClassDetailView /> },

    { path: "/courses", element: <Courses /> },
    { path: "/courses/add", element: <CreateCourse /> },
    { path: "/course/:id", element: <DetailCourseView /> },
    { path: "/course/update/:id", element: <CreateCourse /> },

    { path: "/collaborate", element: <Collaborate /> },

    { path: "/events", element: <Events /> },
    { path: "/event/create", element: <AddEventPost /> },

    { path: "/lectures", element: <Lectures /> },
    { path: "/lectures/add", element: <AddLecture /> },

    { path: "/notes", element: <Notes /> },

    { path: "/demand-letters", element: <DemandLetters /> },
    { path: "/demand-letters/add", element: <AddDemand /> },
    { path: "/demand-letters/response/:id", element: <AddResponse /> },

    { path: "/placement", element: <Placements /> },
    { path: "/placement/my-applications", element: <MyApplications /> },
    { path: "/placement/my-jobs", element: <MyJobs /> },

    { path: "/assignment/faculty", element: <FacultyAssignment /> },
    { path: "/assignment/course", element: <CourseAssignment /> },

    { path: "/schedules", element: <Schedules /> },
    { path: "/schedule/event/:data", element: <ScheduleEvent /> },

    { path: "/roles", element: <RolesDefinition /> },
    { path: "/roles/create", element: <AddRoleDefinition /> },

    { path: "/assigned", element: <Assigned /> },

    { path: "/library", element: <Library /> },
    { path: "/library/add", element: <AddBooks /> },

    { path: "/timetable", element: <Timetable /> },

    { path: "/students", element: <Student /> },
    { path: "/student/create", element: <CreateStudent /> },
    { path: "/student/update/:id", element: <CreateStudent /> },

    { path: "/faculties", element: <Faculty /> },
    { path: "/faculty/create", element: <CreateFaculty /> },
    { path: "/faculty/update/:id", element: <CreateFaculty /> },

    { path: "/staffs", element: <Staff /> },
    { path: "/staff/create", element: <CreateStaff /> },
    { path: "/staff/update/:id", element: <CreateStaff /> },

    { path: "/configurations/basic", element: <Basic /> },
    { path: "/configurations/demand-type", element: <Demand /> },
    { path: "/configurations/demand-type/create", element: <AddNewDemandType /> },
    { path: "/configurations/demand-type/update/:id", element: <AddNewDemandType /> },

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
