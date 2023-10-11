import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { Button } from "@mui/material";
import { Input } from "../../common/forms/input";
import { Textarea } from "../../common/forms/textarea";
import {
    createCourse,
    getCourse,
    updateCourse,
} from "../../store/course/actions";
import { useCrypto } from "../../utils/hooks";
import { CheckboxAndLabel } from "../../common/forms/checkbox";
import { getUniversityFaculty } from "../../store/faculty/actions";
import { getUserName } from "../../utils/helpers";
import { Dropdown } from "../../common/forms/dropdown";
import { FacultyCard } from "../../components/card/class";

enum ComponentMode {
    ADD = "ADD",
    UPDATE = "UPDATE",
}

interface DropdownProps {
    name: string;
    value: string;
}

const CreateCourse = () => {
    const [formData, setFormData] = useState({
        name: "",
        note: "",
    });

    const [sendEmailNotification, setSendEmailNotification] = useState(true)

    const [faculty, setFaculty] = useState<DropdownProps[]>([]);
    const [selectedFaculty, setSelectedFaculty] = useState<DropdownProps[]>([]);

    const { name, note } = formData;

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const { decrypt } = useCrypto();

    const isUpdate = useMatch("/course/update/:id");

    const [currentRouteState] = useState(isUpdate ? ComponentMode.UPDATE : ComponentMode.ADD);

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const universityID = useSelector((state: RootState) => state.university.university.value);

    const { id }: any = useParams();

    const course = useSelector((state: RootState) => state.course.course);

    const university = useSelector((state: RootState) => state.university.university.value);

    const faculties = useSelector((state: RootState) => state.faculty.faculties);

    useEffect(() => {
        dispatch(setBreadcrumps({ name: ["ACADEMIC", "Courses", "Add"], link: "/courses/add" }));
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        if (university) dispatch(getUniversityFaculty({ universityID: university, isActive: "T" }));
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

    useEffect(() => {
        if (currentRouteState === ComponentMode.UPDATE && universityID) {
            dispatch(getCourse({ universityID: universityID, courseID: decrypt(id)! }));
        }
    }, [currentRouteState, universityID, id, dispatch]);

    useEffect(() => {
        if (Object.keys(course).length && currentRouteState === ComponentMode.UPDATE) {
            setFormData({
                name: course.name!,
                note: course.description!,
            });
            const data = []
            for (let i = 0; i < course.facultyID!.length; i++) {
                data.push({
                    name: getUserName(course.facultyID![i]),
                    value: course.facultyID![i]._id!
                })
            }
            setSelectedFaculty(data)
        }
    }, [course, currentRouteState]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const facultyID = []
        for (let i = 0; i < selectedFaculty.length; i++) {
            facultyID.push(selectedFaculty[i].value)
        }

        if (currentRouteState === ComponentMode.ADD)
            dispatch(createCourse({ name, description: note, navigate, universityID: universityID, facultyID: facultyID }));
        else 
            dispatch(updateCourse({ name, description: note, navigate, universityID: universityID, courseID: decrypt(id)!, facultyID: facultyID }))
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

            <main className="addClass__Wrapper">
                <div className="paper">
                    <div className="header">
                        <h4>Add Course</h4>
                        <Button>Bulk Add</Button>
                    </div>
                    <div className="addClass__Form mt-3">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Course name"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Textarea
                                        name="note"
                                        value={note}
                                        onChange={handleInputChange}
                                        placeholder="Note describing course"
                                        rows={4}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Dropdown
                                        optionsArr={faculty}
                                        selected={{name: "", value: ""}}
                                        setSelected={(e: DropdownProps) =>
                                            setSelectedFaculty(v=>v.filter(t=>t.value === e.value).length > 0 ? v : [...v, e])
                                        }
                                        placeholder="Select Faculties"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <CheckboxAndLabel
                                        id="sunday"
                                        label="Send Email Notification"
                                        className="mb-3"
                                        description="Enabling this field sends email invite to faculty for joining the course on Academiq."
                                        checked={sendEmailNotification}
                                        name="sendEmailNotification"
                                        onChange={(_ :React.ChangeEvent<HTMLInputElement>, t :boolean) => setSendEmailNotification(t)}
                                    />
                                </div>
                                {
                                    selectedFaculty.map(t=><div className="col-lg-6 col-md-6 col-12 my-2" key={t.value}>
                                        <FacultyCard name={t.name} />
                                    </div>)
                                }
                            </div>
                            <div className="addClass__Buttons">
                                <Button type="submit">
                                    {isUpdate ? "Update" : "Create"} Course
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateCourse;
