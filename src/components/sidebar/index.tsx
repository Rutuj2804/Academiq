import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { sidebarLayout } from "../../store/settings/types";
import { IconButton } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { setSidebar } from "../../store/layout/slice";

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
                    Academiq
                </div>
                <div className="close">
                    <IconButton onClick={()=>dispatch(setSidebar(false))}>
                        <CloseRounded />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
