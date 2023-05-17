import { MenuRounded, SettingsRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { setSettings } from "../../store/layout/slice";
import { RootState } from "../../store";

const Navbar = () => {

    const dispatch = useDispatch()

    const settings = useSelector((state: RootState)=> state.layout.settings)

    return (
        <div className="container navbar__Wrapper">
            <div className="left">
                <div className="menu">
                    <IconButton>
                        <MenuRounded />
                    </IconButton>
                </div>
                <div className="logo">Throtle</div>
            </div>
            <div className="right">
                <div className="settings">
                    <IconButton onClick={()=>dispatch(setSettings(!settings))}>
                        <SettingsRounded />
                    </IconButton>
                </div>
                <div className="menu">
                    <IconButton>
                        <MenuRounded />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
