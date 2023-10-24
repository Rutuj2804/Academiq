import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";

const Schedules = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Schedules"],
                link: "/schedules",
            })
        );
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
        </div>
    );
};

export default Schedules;
