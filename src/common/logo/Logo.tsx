import React from "react";
import { IoLogoXing } from "react-icons/io";
import { layoutTheme } from "../../store/settings/types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Logo = () => {
    const navigate = useNavigate();

    const theme = useSelector((state: RootState) => state.settings.theme)

    return (
        <div
            className={`logo__Wrapper ${
                theme === layoutTheme[0] ? "light" : "dark"
            }`}
            onClick={() => navigate("/")}
        >
            <IoLogoXing />
            <h4>Academiq</h4>
        </div>
    );
};

export default Logo;
