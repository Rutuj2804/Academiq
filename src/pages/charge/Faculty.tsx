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
import { Button } from "@mui/material"

interface Dropdown {
    name: string;
    value: string;
}

const FacultyCharge = () => {
    const [faculty, setFaculty] = useState<Dropdown[]>([]);
    const [selectedFaculty, setSelectedFaculty] = useState<Dropdown>({
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

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["CHARGE", "Faculty"],
                link: "/Sample",
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
    }, [university]);

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

    const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(selectedFaculty)
    }

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

            <main className="charge__Wrapper">
                <div className="paper">
                    <div className="header">
                        <h4>Faculty Charge</h4>
                    </div>
                    <div className="charge__Container">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Dropdown
                                        optionsArr={faculty}
                                        selected={selectedFaculty}
                                        setSelected={(e: Dropdown) =>
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
                            <div className="charge__FormButtons">
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FacultyCharge;
