import React, { useEffect } from "react";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import Card from "./Card";

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

            <main className="lectures__Wrapper">
                <section className="paper">
                    <div className="header">
                        <h6>Top Lectures <BsArrowRight /></h6>
                    </div>
                    <div className="lectures">
                        <Card title="Lecture 6: Cloud and its types" timestamp="12 May, 2023 8:00AM" />
                        <Card title="Lecture 6: Cloud and its types" timestamp="12 May, 2023 8:00AM" />
                        <Card title="Lecture 6: Cloud and its types" timestamp="12 May, 2023 8:00AM" />
                        <Card title="Lecture 6: Cloud and its types" timestamp="12 May, 2023 8:00AM" />
                        <Card title="Lecture 6: Cloud and its types" timestamp="12 May, 2023 8:00AM" />
                    </div>
                </section>
                
                <section className="paper">
                    <div className="header">
                        <h6>Recent Lectures <BsArrowRight /></h6>
                    </div>
                    <div className="lectures">
                        <Card title="Lecture 6: Cloud and its types" timestamp="12 May, 2023 8:00AM" />
                        <Card title="Lecture 6: Cloud and its types" timestamp="12 May, 2023 8:00AM" />
                        <Card title="Lecture 6: Cloud and its types" timestamp="12 May, 2023 8:00AM" />
                        <Card title="Lecture 6: Cloud and its types" timestamp="12 May, 2023 8:00AM" />
                        <Card title="Lecture 6: Cloud and its types" timestamp="12 May, 2023 8:00AM" />
                    </div>
                </section>
                
                <section className="paper">
                    <div className="header">
                        <h6>Most Loved <BsArrowRight /></h6>
                    </div>
                    <div className="lectures">
                        <Card title="Lecture 6: Cloud and its types" timestamp="12 May, 2023 8:00AM" />
                        <Card title="Lecture 6: Cloud and its types" timestamp="12 May, 2023 8:00AM" />
                        <Card title="Lecture 6: Cloud and its types" timestamp="12 May, 2023 8:00AM" />
                        <Card title="Lecture 6: Cloud and its types" timestamp="12 May, 2023 8:00AM" />
                        <Card title="Lecture 6: Cloud and its types" timestamp="12 May, 2023 8:00AM" />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Lectures;
