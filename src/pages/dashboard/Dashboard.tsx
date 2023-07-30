import React, { useEffect } from "react";
import { MdVerified } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { BsCalendar2Event } from "react-icons/bs";
import { Avatar, Button, IconButton } from "@mui/material";
import PieChart from "../../common/chart/PieChart";
import {
    AssignmentComponent,
    LectureComponent,
    HolidayComponent,
} from "../../components/micro/dashboard";

const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Nov",
        "Dec",
    ];

    const res = dd + " " + months[mm] + ", " + yyyy;
    return res;
};

const Dashboard = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["Hello", "Rutuj"],
                link: "/dashboard",
            })
        );
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <header>
                <div className="left">
                    <h4>{breadcrumps.name.join(", ")}</h4>
                    <div
                        className="breadcrumps"
                        onClick={() => navigate(breadcrumps.link)}
                    >
                        Track your progress here
                    </div>
                </div>
                <div className="right dashboard__Breadcrumps">
                    <h4>{getDate()}</h4>
                    <IconButton disableRipple>
                        <BsCalendar2Event />
                    </IconButton>
                </div>
            </header>

            <main className="dashboard__Wrapper">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="paper chart">
                            <h4>My Attendence</h4>
                            <PieChart />
                        </div>
                        <div className="paper chart mt-4 pb-2">
                            <h4>Upcoming Holidays</h4>
                            <HolidayComponent />
                            <hr />
                            <HolidayComponent />
                            <hr />
                            <HolidayComponent />
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-6 col-12">
                        <div className="paper chart">
                            <h4>My Profile</h4>
                            <div className="profile">
                                <div className="details">
                                    <Avatar
                                        sx={{ height: "100px", width: "100px" }}
                                    />
                                    <div className="user">
                                        <h3>
                                            Rutuj Jeevan Bokade&nbsp;
                                            <span>
                                                <MdVerified />
                                            </span>
                                        </h3>
                                        <h6>Student in MIT ADT University</h6>
                                        <p>Pune, Maharashtra</p>
                                    </div>
                                </div>
                                <div className="button-div">
                                    <Button className="view">
                                        View Profile
                                    </Button>
                                    <Button className="edit">
                                        Edit Profile
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="paper chart mt-4 pb-2">
                                    <h4>Upcoming Lectures</h4>
                                    <LectureComponent />
                                    <hr />
                                    <LectureComponent />
                                    <hr />
                                    <LectureComponent compledted />
                                    <hr />
                                    <LectureComponent compledted />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="paper chart mt-4 pb-2">
                                    <h4>Pending Assignments</h4>
                                    <AssignmentComponent />
                                    <hr />
                                    <AssignmentComponent />
                                    <hr />
                                    <AssignmentComponent compledted />
                                    <hr />
                                    <AssignmentComponent compledted />
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
