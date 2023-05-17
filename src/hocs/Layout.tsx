import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Settings from "../components/settings";
import Background from "../components/background";

interface CProps {
    children: React.ReactNode;
}

const Layout = ({ children }: CProps) => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <Settings />
            <Background />
            {children}
        </div>
    );
};

export default Layout;
