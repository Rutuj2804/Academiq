import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { Input } from "../../common/forms/input";
import { Dropdown } from "../../common/forms/dropdown";
import { getUserName } from "../../utils/helpers";
import { Button } from "@mui/material";
import { ClassCard } from "../../components/card/class";
import { getCourseAssignments, getFacultyAssignments } from "../../store/assignment/actions";
import { setAssignment } from "../../store/layout/slice";
import moment from "moment";
import { getCoursesGlobal } from "../../store/course/actions";

interface DropdownProps {
    name: string;
    value: string;
}

const CourseAssignment = () => {
    const [faculty, setFaculty] = useState<DropdownProps[]>([]);
    const [selectedFaculty, setSelectedFaculty] = useState<DropdownProps>({
        name: "",
        value: "",
    });

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const university = useSelector(
        (state: RootState) => state.university.university.value
    );
    const courses = useSelector(
        (state: RootState) => state.course.courses
    );
    const assignedClasses = useSelector(
        (state: RootState) => state.assignment.assignments
    );

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["Assignment", "Course"],
                link: "/assignment/course",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if (university)
            dispatch(
                getCoursesGlobal({
                    universityID: university,
                    isActive: "T",
                })
            );
    }, [university, dispatch]);

    useEffect(() => {
        if (courses.length) {
            const data = [];
            for (let i = 0; i < courses.length; i++) {
                data.push({
                    name: courses[i].name!,
                    value: courses[i]._id!,
                });
            }
            setFaculty(data);
        }
    }, [courses]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            getCourseAssignments({
                universityID: university,
                courseID: selectedFaculty.value,
            })
        );
    };

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

            <main className="assignment__Wrapper">
                <div className="paper">
                    <div className="header">
                        <h4>Course Assignment</h4>
                        <div className="right">
                            <Button
                                onClick={() =>
                                    dispatch(
                                        setAssignment({
                                            isOpen: true,
                                            type: "COURSES",
                                        })
                                    )
                                }
                            >
                                Add New
                            </Button>
                        </div>
                    </div>
                    <div className="assignment__Container">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-12">
                                    <Dropdown
                                        optionsArr={faculty}
                                        selected={selectedFaculty}
                                        setSelected={(e: DropdownProps) =>
                                            setSelectedFaculty(e)
                                        }
                                        placeholder="Select Course"
                                    />
                                </div>
                            </div>
                            <div className="assignment__FormButtons">
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                        <div className="assignment__Data">
                            <div className="row">
                                {assignedClasses.map((t) => (
                                    <div
                                        key={t._id}
                                        className="col-lg-4 col-md-6 col-12"
                                    >
                                        <ClassCard
                                            name={t.name!}
                                            date={moment(t.createdAt).format(
                                                "DD MMM, YY"
                                            )}
                                            facultyID={t.facultyID!}
                                            classID={t._id!}
                                            selected={selectedFaculty.value}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CourseAssignment;
