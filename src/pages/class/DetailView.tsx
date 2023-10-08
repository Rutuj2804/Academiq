import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import classBg from "../../assets/images/library.jpg";
import { Button, IconButton } from "@mui/material";
import { MoreVertRounded } from "@mui/icons-material";
import {
    AssignmentView,
    CourseView,
    DetailViewTabs,
    FacultyView,
    LectureView,
    StudentView,
    UtilityView,
} from "../../components/micro/class";
import { getClass } from "../../store/class/actions";
import { useCrypto } from "../../utils/hooks";

const Tabs = [
    { number: "1", name: "Students", view: <StudentView /> },
    { number: "2", name: "Faculties", view: <FacultyView /> },
    { number: "3", name: "Lectures", view: <LectureView /> },
    { number: "4", name: "Assignments", view: <AssignmentView /> },
    { number: "5", name: "Utility", view: <UtilityView /> },
    { number: "6", name: "Courses", view: <CourseView /> },
];

const ClassDetailView = () => {
    const [currentTab, setCurrentTab] = useState(Tabs[0]);

    const dispatch = useDispatch<any>();

    const { decrypt } = useCrypto()

    const navigate = useNavigate();

    const { id } = useParams()

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);
    const classFetched = useSelector((state: RootState) => state.class.class)

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab((v) => Tabs.filter((t) => t.number === newValue)[0]);
    };

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Classes", "Class"],
                link: "/class/rutuj",
            })
        );
    }, [dispatch]);

    useEffect(()=>{
        if(id)
        dispatch(getClass(decrypt(id)!))
    }, [id, dispatch])

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

            <main className="classDetailView__Wrapper">
                <div className="paper">
                    <div className="classDetailView__Box">
                        <div className="classDetailView__Header">
                            <img src={classBg} alt="class" />
                            <div className="classDetailView__Titles">
                                <div className="left">
                                    <h4>{classFetched.name}</h4>
                                    <p>
                                        {classFetched.description}
                                    </p>
                                </div>
                                <div className="right">
                                    <Button className="edit">Edit Class</Button>
                                    <IconButton>
                                        <MoreVertRounded />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                        <div className="classDetailView__Options">
                            <div></div>
                            <div className="buttons">
                                <Button>Add Students</Button>
                            </div>
                        </div>
                        <div className="classDetailView__Tabs">
                            <DetailViewTabs
                                currentTab={currentTab}
                                tabs={Tabs}
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ClassDetailView;
