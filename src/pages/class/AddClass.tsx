import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useNavigate, useMatch, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Input } from "../../common/forms/input";
import { Textarea } from "../../common/forms/textarea";
import { createClass, getClass, updateClass } from "../../store/class/actions";
import { useCrypto } from "../../utils/hooks";

enum ComponentMode {
    ADD = "ADD",
    UPDATE = "UPDATE",
}

const AddClass = () => {
    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const { decrypt } = useCrypto();

    const isUpdate = useMatch("/class/update/:id");

    const [currentRouteState] = useState(
        isUpdate ? ComponentMode.UPDATE : ComponentMode.ADD
    );

    const [formData, setFormData] = useState({
        name: "",
        note: "",
    });

    const { name, note } = formData;

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const universityID = useSelector(
        (state: RootState) => state.university.university.value
    );

    const classFetched = useSelector((state: RootState) => state.class.class);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentRouteState === ComponentMode.ADD)
            dispatch(
                createClass({
                    name,
                    description: note,
                    navigate,
                    universityID: universityID,
                })
            );
        else {
            const classID: any = decrypt(id);
            dispatch(
                updateClass({
                    name,
                    description: note,
                    navigate,
                    universityID: universityID,
                    classID: classID,
                })
            );
        }
    };

    const { id }: any = useParams();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Classes", isUpdate? "Update" :"Add"],
                link: `/classes`,
            })
        );
    }, [dispatch, isUpdate]);

    useEffect(() => {
        if (currentRouteState === ComponentMode.UPDATE) {
            const decode: any = decrypt(id);
            dispatch(getClass(decode));
        }
    }, [currentRouteState, universityID, id, dispatch]);

    useEffect(() => {
        if (classFetched && currentRouteState === ComponentMode.UPDATE) {
            const name: any = classFetched.name;
            const description: any = classFetched.description;
            setFormData({
                name: name,
                note: description,
            });
        }
    }, [classFetched, currentRouteState]);

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
                                    </div>
                                </div>
                            </div>

                            <div className="addClass__Buttons">
                                <Button type="submit">{currentRouteState === ComponentMode.ADD ? "Create" : "Update"} Class</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddClass;
