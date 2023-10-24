import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";

const Calls = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ASSETS", "Calls"],
                link: "/calls",
            })
        );
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
        </div>
    );
};

export default Calls;
