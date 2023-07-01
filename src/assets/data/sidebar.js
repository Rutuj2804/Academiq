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
    BsBook,
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
                matches: ["/dashboard", "/profile"],
            },
            {
                name: "Lectures",
                link: "/lectures",
                icon: <BsFilePlay />,
                notifications: 6,
                matches: ["/lectures", "/lectures/add"],
            },
            {
                name: "Demand Letters",
                link: "/demand-letters",
                icon: <BsPatchQuestion />,
                notifications: 2,
                matches: ["/demand-letters", "/demand-letters/add"],
            },
        ],
    },
    {
        title: "ACADEMIC",
        links: [
            {
                name: "Classes",
                link: "/classes",
                icon: <BsBox />,
                notifications: 18,
                matches: ["/classes", "/classes/add"],
            },
            {
                name: "Activities",
                link: "/activities",
                icon: <BsActivity />,
                notifications: 3,
                matches: ["/activities", "/activities/add"],
            },
            {
                name: "Schedule",
                link: "/schedules",
                icon: <BsCalendarEvent />,
                notifications: 1,
                matches: ["/schedules"],
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
                matches: ["/chat"],
            },
            {
                name: "Events",
                link: "/events",
                icon: <BsGlobeCentralSouthAsia />,
                notifications: 1,
                matches: ["/events"],
            },
            {
                name: "Library",
                link: "/library",
                icon: <BsBook />,
                notifications: 14,
                matches: ["/library", "/library/add"],
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
                matches: ["/roles", "/roles/add"],
            },
            {
                name: "Roles Assigned",
                link: "/assigned",
                icon: <BsAward />,
                notifications: 5,
                matches: ["/assigned"],
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
                matches: ["/notes"],
            },
            {
                name: "Calls",
                link: "/calls",
                icon: <BsPersonVideo />,
                notifications: 0,
                matches: ["/calls"],
            },
            {
                name: "Collaborate",
                link: "/collaborate",
                icon: <BsBoxSeam />,
                notifications: 21,
                matches: ["/collaborate"],
            },
        ],
    },
];
