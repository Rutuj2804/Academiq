import { MenuRounded, SettingsRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { setSettings, setSidebar } from "../../store/layout/slice";
import { RootState } from "../../store";

const Navbar = () => {

    const dispatch = useDispatch()

    const settings = useSelector((state: RootState)=> state.layout.settings)
    const sidebar = useSelector((state: RootState)=> state.layout.sidebar)

    return (
        <div className="navbar__Wrapper">
            <div className="left">
                {!sidebar && <div className="logo">Academiq</div>}
            </div>
            <div className="right">
                <div className="settings">
                    <IconButton onClick={()=>dispatch(setSettings(!settings))}>
                        <SettingsRounded />
                    </IconButton>
                </div>
                <div className="menu">
                    <IconButton onClick={()=>dispatch(setSidebar(!sidebar))}>
                        <MenuRounded />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
