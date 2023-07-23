import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Settings from "../components/settings";
import Background from "../components/background";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { sidebarLayout } from "../store/settings/types";
import Messages from "../modules/messages";
import Popups from "../modules/popups";
import Footer from "../components/footer";
import Loader from "../components/loader";

interface CProps {
    children: React.ReactNode;
}

const Layout = ({ children }: CProps) => {
    const sidebar = useSelector((state: RootState) => state.layout.sidebar);
    const sidebarStyle = useSelector(
        (state: RootState) => state.settings.sidebar
    );
    const isLoading = useSelector(
        (state: RootState) => state.loading.isLoading
    );

    return (
        <div>
            <Sidebar />
            <Settings />
            <Background />
            <div
                className={
                    sidebar
                        ? `layout__space-${
                              sidebarStyle === sidebarLayout[0]
                                  ? "left"
                                  : "right"
                          }`
                        : `layout__expand`
                }
            >
                <Navbar />
                <Messages />
                <Popups />
                {children}
                <Footer />
            </div>

            {isLoading > 0 ? <Loader /> : null}
        </div>
    );
};

export default Layout;
