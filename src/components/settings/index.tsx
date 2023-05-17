import { IconButton } from "@mui/material";
import {
    CloseRounded,
    LightModeRounded,
    DarkModeRounded,
    AlignHorizontalLeftRounded,
    AlignHorizontalRightRounded,
} from "@mui/icons-material";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSettings } from "../../store/layout/slice";
import { RootState } from "../../store";
import { changeSidebar, changeTheme } from "../../store/settings/slice";
import { layoutTheme, sidebarLayout } from "../../store/settings/types";

const Settings = () => {
    const dispatch = useDispatch();

    const settings = useSelector((state: RootState) => state.layout.settings);

    const sidebar = useSelector((state: RootState) => state.settings.sidebar);

    const theme = useSelector((state: RootState) => state.settings.theme);

    const settingsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const triggerFunction = (e: any) => {
            const { current: wrap } = settingsRef;
            if (wrap && !wrap.contains(e.target as Node)) {
                dispatch(setSettings(false));
            }
        };

        document.addEventListener("mousedown", triggerFunction);

        return () => {
            document.removeEventListener("mousedown", triggerFunction);
        };
    }, [dispatch]);

    return (
        <div
            className={`settings__Wrapper ${settings ? "" : "close"}`}
            ref={settingsRef}
        >
            <div className="header">
                <div className="title">Settings</div>
                <IconButton onClick={() => dispatch(setSettings(false))}>
                    <CloseRounded />
                </IconButton>
            </div>
            <hr />
            <div className="body">
                <div className="section">
                    <h6>Mode</h6>
                    <div className="box">
                        <div
                            className={`option ${
                                theme === layoutTheme[0] ? "active" : ""
                            }`}
                            onClick={() =>
                                dispatch(changeTheme(layoutTheme[0]))
                            }
                        >
                            <LightModeRounded />
                            <p>Light</p>
                        </div>
                        <div
                            className={`option ${
                                theme === layoutTheme[1] ? "active" : ""
                            }`}
                            onClick={() =>
                                dispatch(changeTheme(layoutTheme[1]))
                            }
                        >
                            <DarkModeRounded />
                            <p>Dark</p>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <h6>Sidebar Alignment</h6>
                    <div className="box">
                        <div
                            className={`option ${
                                sidebar === sidebarLayout[0] ? "active" : ""
                            }`}
                            onClick={() =>
                                dispatch(changeSidebar(sidebarLayout[0]))
                            }
                        >
                            <AlignHorizontalLeftRounded />
                            <p>Left</p>
                        </div>
                        <div
                            className={`option ${
                                sidebar === sidebarLayout[1] ? "active" : ""
                            }`}
                            onClick={() =>
                                dispatch(changeSidebar(sidebarLayout[1]))
                            }
                        >
                            <AlignHorizontalRightRounded />
                            <p>Right</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
