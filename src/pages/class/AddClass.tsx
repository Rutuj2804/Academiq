import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Input } from "../../common/forms/input";
import { Textarea } from "../../common/forms/textarea";
import { createClass } from "../../store/class/actions";

const AddClass = () => {
    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        note: "",
    });

    const { name, note } = formData;

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const universityID = useSelector((state: RootState) => state.university.university.value)

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createClass({ name, description: note, navigate, universityID: universityID }))
    };

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Classes", "Add"],
                link: "/classes/add",
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

            <main className="addClass__Wrapper">
                <div className="paper">
                    <div className="header">
                        <h4>Add Class</h4>
                        <Button>Bulk Add</Button>
                    </div>

                    <div className="addClass__Form mt-3">
                        <form onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                                required
                                placeholder="Class name"
                            />
                            <Textarea
                                name="note"
                                value={note}
                                onChange={handleInputChange}
                                placeholder="Note describing class"
                                rows={6}
                            />
                            <div className="addClass__Suggestions">
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <ol>
                                            <li>
                                                Please try to keep names of classes as
                                                per academic year or financial year of
                                                the university to avoid confusion.
                                            </li>
                                            <li>
                                                After Submit adding timetable, courses, students and faculties to class are necessary steps to make a class operational. 
                                            </li>
                                            <li>
                                                You can add faculties and students either manually or through a .csv file.
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div className="addClass__Buttons">
                                <Button type="submit">Create Class</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddClass;
