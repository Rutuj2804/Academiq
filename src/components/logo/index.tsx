import React from "react";
import { IoLogoXing } from "react-icons/io";
import { layoutTheme } from "../../store/settings/types";

interface CProps {
    mode: string;
}

const Logo = ({ mode }: CProps) => {
    return (
        <div className={`logo__Wrapper ${mode === layoutTheme[0] ? "light" : "dark"}`}>
            <IoLogoXing />
            <h4>Academiq</h4>
        </div>
    );
};

export default Logo;
