import React from "react";
import { useSelector } from "react-redux"
import { RootState } from "../../store";

const Background = () => {

    const background = useSelector((state:RootState)=>state.layout.background)

    return <div className={background ? "background__Wrapper" : ""}></div>;
};

export default Background;
