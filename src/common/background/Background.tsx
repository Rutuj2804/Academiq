import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Background = () => {
    const layout = useSelector((state: RootState) => state.layout);

    return (
        <>
            <div
                className={
                    layout.background
                        ? "background__Wrapper"
                        : ""
                }
            ></div>
            <div
                className={
                    layout.background_modules
                        ? "backgroundModules__Wrapper"
                        : ""
                }
            ></div>
        </>
    );
};

export default Background;
