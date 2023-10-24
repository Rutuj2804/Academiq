import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { Input } from "../../common/forms/input";
import { Textarea } from "../../common/forms/textarea";
import { CheckboxAndLabel } from "../../common/forms/checkbox";
import { Button } from "@mui/material"
import { createSubmission } from "../../store/activity/actions";
import { useCrypto } from "../../utils/hooks";

const AddSubmission = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        sendEmailNotification: true
    });

    const [files, setFiles] = useState<FileList | null>(null);

    const { decrypt } = useCrypto()

    const { title, description, sendEmailNotification } = formData;

    const dispatch = useDispatch<any>();

    const navigate = useNavigate();

    const { id } = useParams();

    const universityID = useSelector((state: RootState) => state.university.university.value)

    useEffect(() => {
        if (id)
            dispatch(
                setBreadcrumps({
                    name: ["ACADEMIC", "Activities", "Submission"],
                    link: `/activities`,
                })
            );
    }, [dispatch, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleCheckboxes = (
        _: React.ChangeEvent<HTMLInputElement>,
        c: boolean
    ) => {
        setFormData({ ...formData, sendEmailNotification: c });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(createSubmission({ title, description, files, navigate, universityID, activityID: decrypt(id!)! }))
    }

    return (
        <div className="section__Wrapper">
            <main className="submission__Wrapper">
                <div className="paper">
                    <div className="submission__Container">
                        <h4>Submit Assignment</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        name="title"
                                        value={title}
                                        placeholder="Title"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        type="file"
                                        placeholder="Attach Files"
                                        onChange={(e) =>
                                            setFiles(e.target.files)
                                        }
                                        multiple
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Textarea
                                        name="description"
                                        value={description}
                                        onChange={handleChange}
                                        placeholder="Description"
                                        rows={5}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <CheckboxAndLabel
                                        id="sunday"
                                        label="Send Email Notification"
                                        className="mb-3"
                                        description="Enabling this field sends email notification to faculty about the submission."
                                        checked={sendEmailNotification}
                                        name="sendEmailNotification"
                                        onChange={handleCheckboxes}
                                    />
                                </div>
                            </div>
                            <div className="submission__FormButton">
                                <Button type="submit">
                                    Submit Assignment
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddSubmission;
