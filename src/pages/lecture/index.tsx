import React, { useEffect } from "react";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import LectureCard from "./LectureCard";

const Lectures = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const breadcrumps = useSelector(
        (state: RootState) => state.breadcrumps
    );

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["GENERAL", "Lectures"],
                link: "/lectures",
            })
        );
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <header>
                <div className="left">
                    <h4>{breadcrumps.name[1]}</h4>
                    <div className="breadcrumps" onClick={()=>navigate(breadcrumps.link)}>{breadcrumps.name.join(" > ")}</div>
                </div>
                <div className="right">
                    <FcPieChart />
                    <FcBarChart />
                </div>
            </header>

            <main className="lecture__Wrapper">
                <div className="row">
                    <div className="col-lg-3 col-lg-2 col-12"></div>
                    <div className="col-lg-6 col-md-8 col-12">
                        <LectureCard />
                        <LectureCard />
                        <LectureCard />
                        <LectureCard />
                    </div>
                    <div className="col-lg-3 col-lg-2 col-12"></div>
                </div>
            </main>
        </div>
    );
};

export default Lectures;
