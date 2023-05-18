import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Settings from "../components/settings";
import Background from "../components/background";
import { useSelector } from "react-redux"
import { RootState } from "../store";
import { sidebarLayout } from "../store/settings/types";
import Messages from "../modules/messages";

interface CProps {
    children: React.ReactNode;
}

const Layout = ({ children }: CProps) => {

    const sidebar = useSelector((state:RootState)=>state.layout.sidebar)
    const sidebarStyle = useSelector((state:RootState)=>state.settings.sidebar)

    return (
        <div>
            <Sidebar />
            <Settings />
            <Background />
            <div className={sidebar ? `layout__space-${sidebarStyle === sidebarLayout[0] ? "left" : "right"}` : `layout__expand`}>
                <Navbar />
                <Messages />
                {children}
            </div>
        </div>
    );
};

export default Layout;
