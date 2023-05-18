import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Search from "./Search";

const Popups = () => {
    const layout = useSelector((state: RootState) => state.layout);

    return (
        layout.popup ? (
            <div className="popup__Wrapper">
                {layout.search ? <Search /> : null}
            </div>
        ) : <></>
    );
};

export default Popups;
