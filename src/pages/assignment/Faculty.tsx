import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { Input } from "../../common/forms/input";
import { Dropdown } from "../../common/forms/dropdown";
import { getUniversityFaculty } from "../../store/faculty/actions";
import { getUserName } from "../../utils/helpers";
import { Button } from "@mui/material";
import { ClassCard } from "../../components/card/class";
import { getFacultyAssignments } from "../../store/assignment/actions";
import { setAssignment } from "../../store/layout/slice";
import moment from "moment";

interface DropdownProps {
    name: string;
    value: string;
}

const FacultyAssignment = () => {
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
    const faculties = useSelector(
        (state: RootState) => state.faculty.faculties
    );
    const assignedClasses = useSelector(
        (state: RootState) => state.assignment.assignments
    );

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["Assignment", "Faculties"],
                link: "/assignment/faculty",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if (university)
            dispatch(
                getUniversityFaculty({
                    universityID: university,
                    isActive: "T",
                })
            );
    }, [university, dispatch]);

    useEffect(() => {
        if (faculties.length) {
            const data = [];
            for (let i = 0; i < faculties.length; i++) {
                data.push({
                    name: getUserName(faculties[i].userID!),
                    value: faculties[i].userID?._id!,
                });
            }
            setFaculty(data);
        }
    }, [faculties]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            getFacultyAssignments({
                universityID: university,
                facultyID: selectedFaculty.value,
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
                        <h4>Faculty Assignment</h4>
                        <div className="right">
                            <Button
                                onClick={() =>
                                    dispatch(
                                        setAssignment({
                                            isOpen: true,
                                            type: "FACULTY",
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
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Dropdown
                                        optionsArr={faculty}
                                        selected={selectedFaculty}
                                        setSelected={(e: DropdownProps) =>
                                            setSelectedFaculty(e)
                                        }
                                        placeholder="Select Faculty"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        type="text"
                                        name=""
                                        placeholder="Enrolment Number"
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

export default FacultyAssignment;
