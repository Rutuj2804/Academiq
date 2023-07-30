import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { PostCard } from "../../components/card/event";

const Events = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["SOCIALS", "Events"],
                link: "/events",
            })
        );
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <header>
                <div className="left">
                    <h4>{breadcrumps.name[1]}</h4>
                    <div
                        className="breadcrumps"
                        onClick={() => navigate(breadcrumps.link)}
                    >
                        {breadcrumps.name.join(" > ")}
                    </div>
                </div>
                <div className="right">
                    <FcPieChart />
                    <FcBarChart />
                </div>
            </header>

            <main className="events__Wrapper">
                <div className="row">
                    <div className="col-lg-3 col-md-2 col-12"></div>
                    <div className="col-lg-6 col-md-8 col-12">
                        <PostCard liked comment />
                        <PostCard liked />
                        <PostCard comment />
                    </div>
                    <div className="col-lg-3 col-md-2 col-12"></div>
                </div>
            </main>
        </div>
    );
};

export default Events;
