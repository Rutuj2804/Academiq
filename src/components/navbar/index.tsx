import {
    MenuRounded,
    NotificationsRounded,
    PersonRounded,
    SearchRounded,
    SettingsRounded,
} from "@mui/icons-material";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSettings, setSidebar } from "../../store/layout/slice";
import { RootState } from "../../store";
import Logo from "../logo";

const Navbar = () => {
    const dispatch = useDispatch();

    const settings = useSelector((state: RootState) => state.layout.settings);
    const sidebar = useSelector((state: RootState) => state.layout.sidebar);

    return (
        <div className="navbar__Wrapper">
            <div className="left">
                {!sidebar && (
                    <div className="logo">
                        <Logo mode="LIGHT" />
                    </div>
                )}
            </div>
            <div className="right">
                <div className="search">
                    <Tooltip title="Search">
                        <IconButton>
                            <SearchRounded />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="notifications">
                    <Tooltip title="Notifications">
                        <IconButton>
                            <Badge variant="dot" color="primary">
                                <NotificationsRounded />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="profile">
                    <Tooltip title="Profile">
                        <IconButton>
                            <Badge variant="dot" color="primary">
                                <PersonRounded />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="settings">
                    <Tooltip title="Settings">
                        <IconButton
                            onClick={() => dispatch(setSettings(!settings))}
                        >
                            <SettingsRounded />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="menu">
                    <Tooltip title="Menu">
                        <IconButton
                            onClick={() => dispatch(setSidebar(!sidebar))}
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
