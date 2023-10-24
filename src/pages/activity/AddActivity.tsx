import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { useNavigate } from "react-router-dom";
import { Input } from "../../common/forms/input";
import { Textarea } from "../../common/forms/textarea";
import { CheckboxAndLabel } from "../../common/forms/checkbox";
import { Button } from "@mui/material";
import { Dropdown } from "../../common/forms/dropdown";
import { getUniversityClass } from "../../store/class/actions";
import { createActivity } from "../../store/activity/actions";

enum dropdownTypes {
    "CLASS" = "CLASS",
    "PRIORITY" = "PRIORITY",
}

const priorityArray = [
    { name: "Very High", value: 5 },
    { name: "High", value: 4 },
    { name: "Normal", value: 3 },
    { name: "Low", value: 2 },
    { name: "Very Low", value: 1 },
]

const AddActivity = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        priority: priorityArray[0],
        deadline: "",
        sendEmailNotification: true,
    });

    const [files] = useState<File[]>([]);
    const [classes, setClasses] = useState<any[]>([]);
    const [classSelected, setClassSelected] = useState<any>({
        name: "",
        value: "",
    });

    const { name, description, priority, deadline, sendEmailNotification } =
        formData;

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const universityID = useSelector(
        (state: RootState) => state.university.university.value
    );
    const classesGlobal = useSelector(
        (state: RootState) => state.class.classes
    );

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Activities", "Add"],
                link: "/activities/add",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if (classesGlobal.length) {
            const data = [];
            for (let i = 0; i < classesGlobal.length; i++) {
                data.push({
                    name: classesGlobal[i].name,
                    value: classesGlobal[i]._id,
                });
            }
            setClasses(data);
            setClassSelected(data[0]);
        }
    }, [classesGlobal, dispatch, setClasses, setClassSelected]);

    useEffect(() => {
        if (universityID)
            dispatch(
                getUniversityClass({
                    universityID: universityID,
                    isActive: "T",
                })
            );
    }, [universityID, dispatch]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxes = (
        _: React.ChangeEvent<HTMLInputElement>,
        c: boolean
    ) => {
        setFormData({ ...formData, sendEmailNotification: c });
    };

    const handleDropdowns = (t: dropdownTypes, v: any) => {
        if (t === dropdownTypes.CLASS) {
            setClassSelected(v);
        } else if(t === dropdownTypes.PRIORITY) {
            setFormData({ ...formData, priority: v })
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            createActivity({
                universityID,
                classID: classSelected.value,
                name,
                description,
                priority: priority.value,
                deadline,
                navigate,
                sendEmailNotification,
                files,
            })
        );
    };

    return (
        <div className="section__Wrapper">
            <main className="addActivity__Wrapper">
                <div className="paper">
                    <div className="createStudent__Form">
                        <div className="header">
                            <h4>Add Activity</h4>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                        name="name"
                                        required
                                        autoComplete="off"
                                        placeholder="Name"
                                        autoFocus
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                <Dropdown
                                        optionsArr={priorityArray}
                                        selected={priority}
                                        setSelected={(v: number | string) =>
                                            handleDropdowns(
                                                dropdownTypes.PRIORITY,
                                                v
                                            )
                                        }
                                        className="mb-3"
                                        placeholder="Class"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Textarea
                                        value={description}
                                        onChange={handleChange}
                                        name="description"
                                        autoComplete="off"
                                        placeholder="Description"
                                        rows={5}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        type="date"
                                        value={deadline}
                                        onChange={handleChange}
                                        name="deadline"
                                        autoComplete="off"
                                        placeholder="Deadline"
                                        required
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Dropdown
                                        optionsArr={classes}
                                        selected={classSelected}
                                        setSelected={(v: number | string) =>
                                            handleDropdowns(
                                                dropdownTypes.CLASS,
                                                v
                                            )
                                        }
                                        className="mb-3"
                                        placeholder="Class"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <CheckboxAndLabel
                                        id="sunday"
                                        label="Send Email Notification"
                                        className="mb-3"
                                        description="Enabling this field sends email notification to students about the activity."
                                        checked={sendEmailNotification}
                                        name="sendEmailNotification"
                                        onChange={handleCheckboxes}
                                    />
                                </div>
                                <div className="createStudent__FormButton">
                                    <Button type="submit">
                                        Create Activity
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddActivity;
