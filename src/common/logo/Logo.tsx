import React from "react";
import { IoLogoXing } from "react-icons/io";
import { layoutTheme } from "../../store/settings/types";
import { useNavigate } from "react-router-dom";

interface CProps {
    mode: string;
}

const Logo = ({ mode }: CProps) => {
    const navigate = useNavigate();

    return (
        <div
            className={`logo__Wrapper ${
                mode === layoutTheme[0] ? "light" : "dark"
            }`}
            onClick={() => navigate("/")}
        >
            <IoLogoXing />
            <h4>Academiq</h4>
        </div>
    );
};

export default Logo;
