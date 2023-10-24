import React, { useEffect } from "react";
import { Navbar } from "../common/navbar";
import { Sidebar } from "../common/sidebar";
import { Settings } from "../common/setting";
import { Background } from "../common/background";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { sidebarLayout } from "../store/settings/types";
import Messages from "../modules/messages";
import Popups from "../modules/popups";
import { Footer } from "../common/footer";
import { Loader } from "../common/loader";
import { getUniversity } from "../store/university/actions";
import { getMyRole } from "../store/roles/actions";
import { Header } from "../common/header";

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

    const universityID = useSelector((state: RootState) => state.university.university.value)

    const dispatch = useDispatch<any>()

    useEffect(()=>{
        dispatch(getUniversity())
    }, [dispatch])

    useEffect(() => {
        if(universityID) {
            dispatch(getMyRole(universityID))
        }
    }, [universityID, dispatch])

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
                <Header />
                {children}
                <Footer />
            </div>

            {isLoading > 0 ? <Loader /> : null}
        </div>
    );
};

export default Layout;
