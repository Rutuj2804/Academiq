import {
    MenuRounded,
    NotificationsRounded,
    PersonRounded,
    SearchRounded,
    SettingsRounded,
} from "@mui/icons-material";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications, setProfile, setSearch, setSettings, setSidebar } from "../../store/layout/slice";
import { RootState } from "../../store";
import Logo from "../logo";
import { useState } from "react";
import ChangeInstituteDropdown from "../commons/dropdown/ChangeInstituteDropdown";
import ProfileMenu from "./ProfileMenu";
import NotificationMenu from "./NotificationMenu";

const optionsArr = [
    { name: "MIT ADT University", value: "SomeID" },
    { name: "K V Southern Command", value: "SomeID2" },
]

const Navbar = () => {
    const [selected, setSelected] = useState(optionsArr[0]);

    const dispatch = useDispatch();

    const layout = useSelector((state: RootState) => state.layout);

    return (
        <div className="navbar__Wrapper">
            <div className="left">
                {!layout.sidebar && (
                    <div className="logo">
                        <Logo mode="LIGHT" />
                        <div className="vr"></div>
                        <div className="navbar__ChangeUniversity">
                            <ChangeInstituteDropdown
                                optionsArr={optionsArr}
                                selected={selected}
                                setSelected={setSelected}
                                width={250}
                            />
                        </div>
                    </div>
                )}
                <div className="navbar__ChangeUniversity">
                    {layout.sidebar && <ChangeInstituteDropdown
                        optionsArr={optionsArr}
                        selected={selected}
                        setSelected={setSelected}
                        width={250}
                    />}
                </div>
            </div>
            <div className="right">
                <div className="search">
                    <Tooltip title="Search">
                        <IconButton
                            onClick={() => dispatch(setSearch(!layout.search))}
                        >
                            <SearchRounded />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="notifications">
                    <Tooltip title="Notifications">
                        <IconButton onClick={()=>dispatch(setNotifications(!layout.notifications))}>
                            <Badge variant="dot" color="primary">
                                <NotificationsRounded />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <div className="profile__Menu">
                        <NotificationMenu />
                    </div>
                </div>
                <div className="profile">
                    <Tooltip title="Profile">
                        <IconButton onClick={()=>dispatch(setProfile(!layout.profile))}>
                            <Badge variant="dot" color="primary">
                                <PersonRounded />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <div className="profile__Menu">
                        <ProfileMenu />
                    </div>
                </div>
                <div className="settings">
                    <Tooltip title="Settings">
                        <IconButton
                            onClick={() =>
                                dispatch(setSettings(!layout.settings))
                            }
                        >
                            <SettingsRounded />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="menu">
                    <Tooltip title="Menu">
                        <IconButton
                            onClick={() =>
                                dispatch(setSidebar(!layout.sidebar))
                            }
                        >
                            <MenuRounded />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
