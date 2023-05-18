import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { sidebarLayout } from "../../store/settings/types";
import { IconButton } from "@mui/material";
import Logo from "../logo";

const Sidebar = () => {

    const dispatch = useDispatch()

    const sidebar = useSelector((state: RootState) => state.layout.sidebar);
    const sidebarStyle = useSelector(
        (state: RootState) => state.settings.sidebar
    );

    return (
        <div
            className={`sidebar__Wrapper ${
                sidebarStyle === sidebarLayout[0] ? "left" : "right"
            } ${sidebar ? "" : "close"}`}
        >
            <div className="top">
                <div className="logo">
                    <Logo mode="LIGHT" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
