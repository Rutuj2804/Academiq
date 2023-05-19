import {
    BsGrid,
    BsFilePlay,
    BsPatchQuestion,
    BsBox,
    BsActivity,
    BsChatSquareText,
    BsGlobeCentralSouthAsia,
    BsCalendarEvent,
    BsAward,
    BsBricks,
    BsSticky,
    BsPersonVideo,
    BsBoxSeam,
} from "react-icons/bs";

export const sideBarData = [
    {
        title: "GENERAL",
        links: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BsGrid />,
                notifications: 0,
            },
            {
                name: "Lectures",
                link: "/lectures",
                icon: <BsFilePlay />,
                notifications: 6,
            },
            {
                name: "Queries",
                link: "/query",
                icon: <BsPatchQuestion />,
                notifications: 2,
            },
        ],
    },
    {
        title: "ACADEMIC",
        links: [
            {
                name: "Classes",
                link: "/class",
                icon: <BsBox />,
                notifications: 18,
            },
            {
                name: "Activities",
                link: "/activity",
                icon: <BsActivity />,
                notifications: 3,
            },
            {
                name: "Schedule",
                link: "/schedule",
                icon: <BsCalendarEvent />,
                notifications: 1,
            },
        ],
    },
    {
        title: "SOCIALS",
        links: [
            {
                name: "Chat",
                link: "/chat",
                icon: <BsChatSquareText />,
                notifications: 0,
            },
            {
                name: "Events",
                link: "/events",
                icon: <BsGlobeCentralSouthAsia />,
                notifications: 1,
            },
        ],
    },
    {
        title: "Responsibilities",
        links: [
            {
                name: "Roles Definition",
                link: "/roles",
                icon: <BsBricks />,
                notifications: 0,
            },
            {
                name: "Roles Assigned",
                link: "/assigned",
                icon: <BsAward />,
                notifications: 5,
            },
        ],
    },
    {
        title: "Assets",
        links: [
            {
                name: "Notes",
                link: "/notes",
                icon: <BsSticky />,
                notifications: 3,
            },
            {
                name: "Calls",
                link: "/call",
                icon: <BsPersonVideo />,
                notifications: 0,
            },
            {
                name: "Collaborate",
                link: "/collaborate",
                icon: <BsBoxSeam />,
                notifications: 21,
            },
        ],
    },
];
