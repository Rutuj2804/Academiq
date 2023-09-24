import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { Button } from "@mui/material";
import { Input } from "../../common/forms/input";
import { Textarea } from "../../common/forms/textarea";
import { createCourse, getCourse, updateCourse } from "../../store/course/actions";
import { useCrypto } from "../../utils/hooks";

enum ComponentMode {
    ADD = "ADD",
    UPDATE = "UPDATE",
}

const CreateCourse = () => {

    const [formData, setFormData] = useState({
        name: "",
        note: "",
    });

    const { name, note } = formData;

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const { decrypt } = useCrypto();

    const isUpdate = useMatch("/course/update/:id");

    const [currentRouteState] = useState(
        isUpdate ? ComponentMode.UPDATE : ComponentMode.ADD
    );

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const universityID = useSelector((state: RootState) => state.university.university.value)

    const { id }: any = useParams();

    const course = useSelector((state: RootState) => state.course.course);

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Courses", "Add"],
                link: "/courses/add",
            })
        );
    }, [dispatch]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentRouteState === ComponentMode.ADD)
            dispatch(createCourse({ name, description: note, navigate, universityID: universityID }))
        else{
            const courseID:any = decrypt(id)
            dispatch(updateCourse({ name, description: note, navigate, universityID: universityID, courseID: courseID }))
        }
    };

    useEffect(() => {
        if (currentRouteState === ComponentMode.UPDATE && universityID) {
            const decode: any = decrypt(id);
            dispatch(getCourse({ universityID: universityID, courseID: decode }));
        }
    }, [currentRouteState, universityID, id, dispatch]);

    useEffect(() => {
        if (course && currentRouteState === ComponentMode.UPDATE) {
            const name: any = course.name;
            const description: any = course.description;
            setFormData({
                name: name,
                note: description,
            });
        }
    }, [course, currentRouteState]);

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
                        <h4>Add Course</h4>
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
                                placeholder="Course name"
                            />
                            <Textarea
                                name="note"
                                value={note}
                                onChange={handleInputChange}
                                placeholder="Note describing course"
                                rows={6}
                            />
                            <div className="addClass__Suggestions">
                                <div className="row">
                                    {/* <div className="col-md-6 col-12">
                                        <ol>
                                            <li>
                                                Please try to keep names of
                                                classes as per academic year or
                                                financial year of the university
                                                to avoid confusion.
                                            </li>
                                            <li>
                                                After Submit adding timetable,
                                                courses, students and faculties
                                                to class are necessary steps to
                                                make a class operational.
                                            </li>
                                            <li>
                                                You can add faculties and
                                                students either manually or
                                                through a .csv file.
                                            </li>
                                        </ol>
                                    </div> */}
                                </div>
                            </div>

                            <div className="addClass__Buttons">
                                <Button type="submit">{isUpdate ? "Update" :"Create"} Course</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateCourse;
