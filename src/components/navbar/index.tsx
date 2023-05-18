import {
    MenuRounded,
    NotificationsRounded,
    PersonRounded,
    SearchRounded,
    SettingsRounded,
} from "@mui/icons-material";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setSettings, setSidebar } from "../../store/layout/slice";
import { RootState } from "../../store";
import Logo from "../logo";

const Navbar = () => {
    const dispatch = useDispatch();

    const layout = useSelector((state: RootState) => state.layout);

    return (
        <div className="navbar__Wrapper">
            <div className="left">
                {!layout.sidebar && (
                    <div className="logo">
                        <Logo mode="LIGHT" />
                    </div>
                )}
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
