import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { Calender } from "../../components/micro/timetable";

const Timetable = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Timetable"],
                link: "/timetable",
            })
        );
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <main className="timetable__Wrapper">
                <div className="paper chart">
                    <Calender />
                </div>
            </main>
        </div>
    );
};

export default Timetable;
