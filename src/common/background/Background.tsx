import React from "react";
import { useSelector } from "react-redux"
import { RootState } from "../../store";

const Background = () => {

    const layout = useSelector((state:RootState)=>state.layout)

    return <div className={layout.background || layout.background_modules ? "background__Wrapper" : ""}></div>;
};

export default Background;
