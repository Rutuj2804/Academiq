import React, { useEffect } from "react";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import AreaChart from "../../components/charts/AreaChart";
import Cards from "./Cards";

const Dashboard = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["GENERAL", "Dashboard"],
                link: "/dashboard",
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

            <main className="dashboard__Wrapper">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="paper">
                            <AreaChart />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="row">
                            <div className="col-6">
                                <div className="paper">
                                    <Cards />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="paper">
                                    <Cards />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="paper">
                                    <Cards />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="paper">
                                    <Cards />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="paper">
                                    <Cards />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="paper">
                                    <Cards />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
