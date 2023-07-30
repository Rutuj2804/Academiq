import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Step, StepLabel, Stepper } from "@mui/material";
import { Input } from "../../common/forms/input";
import { Textarea } from "../../common/forms/textarea";
import { setMessage } from "../../store/messages/slice";
import { errorType } from "../../store/messages/types";
import { DragFiles } from "../../common/forms/dragfiles";
import { CourseCard } from "../../components/card/course";
import { TimetableCard } from "../../components/card/timetable";
import { CheckboxAndLabel } from "../../common/forms/checkbox";
import { CloseRounded } from "@mui/icons-material";
import { calculateFileSize } from "../../utils/helpers";

enum MoveType {
    NEXT = "NEXT",
    BACK = "BACK",
}

const AddClass = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        note: "",
    });

    const [students, setStudents] = useState<null | File>(null);

    const [faculties, setFaculties] = useState<null | File>(null);

    const { name, note } = formData;

    const [activeStep, setActiveStep] = useState(0);

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormMovement = (t: MoveType) => {
        if (activeStep === 0 && name === "") {
            dispatch(
                setMessage({
                    _id: `${Math.random() * 10000}`,
                    text: "Name field is necessary",
                    type: errorType[0],
                })
            );
            return;
        }

        if (t === MoveType.NEXT && activeStep < 3) setActiveStep((v) => v + 1);
        else if (t === MoveType.BACK && activeStep > 0)
            setActiveStep((v) => v - 1);
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

                    <div className="addClass__Stepper">
                        <Stepper activeStep={activeStep} alternativeLabel>
                            <Step>
                                <StepLabel>Create class</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>
                                    Add Students and faculties
                                </StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Assign course</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Assign timetable</StepLabel>
                            </Step>
                        </Stepper>
                    </div>

                    <div className="addClass__Form mt-3">
                        <form>
                            {activeStep === 0 && (
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
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
                                        <CheckboxAndLabel
                                            id="emails"
                                            label=""
                                            description="Enabling this will send emails of invitation to students and
                                                    faculties informing them about their presence in online class.
                                                    If a faculty or a student is not a user of Academiq will recieve
                                                    invitation with login creadentials."
                                            checked={true}
                                            onChange={() => {}}
                                        />
                                    </div>
                                </div>
                            )}
                            {activeStep === 1 && (
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12 addClass__AddFiles">
                                        <DragFiles
                                            title="Students"
                                            onChange={(f: File[]) =>
                                                setStudents(f[0])
                                            }
                                        />
                                        <Button>
                                            Download sample CSV file
                                        </Button>
                                        {students ? (
                                            <div className="addClass__FileSelected">
                                                <div className="filename">
                                                    <h6>{students.name}</h6>
                                                    <p>
                                                        {calculateFileSize(
                                                            students.size
                                                        )}
                                                    </p>
                                                </div>
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        setStudents(null)
                                                    }
                                                >
                                                    <CloseRounded />
                                                </IconButton>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 addClass__AddFiles">
                                        <DragFiles
                                            title="Faculties"
                                            onChange={(f: File[]) =>
                                                setFaculties(f[0])
                                            }
                                        />
                                        <Button>
                                            Download sample CSV file
                                        </Button>
                                        {faculties ? (
                                            <div className="addClass__FileSelected">
                                                <div className="filename">
                                                    <h6>{faculties.name}</h6>
                                                    <p>
                                                        {calculateFileSize(
                                                            faculties.size
                                                        )}
                                                    </p>
                                                </div>
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        setFaculties(null)
                                                    }
                                                >
                                                    <CloseRounded />
                                                </IconButton>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            )}
                            {activeStep === 2 && (
                                <div className="row addClass__CourseBox">
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <CourseCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <CourseCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <CourseCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <CourseCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <CourseCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <CourseCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <CourseCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <CourseCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <CourseCard />
                                    </div>
                                </div>
                            )}
                            {activeStep === 3 && (
                                <div className="row addClass__CourseBox">
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <TimetableCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <TimetableCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <TimetableCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <TimetableCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <TimetableCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <TimetableCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <TimetableCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <TimetableCard />
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <TimetableCard />
                                    </div>
                                </div>
                            )}
                        </form>
                        <div className="addClass__ControlButtons">
                            <div className="left">
                                {activeStep === 2 && (
                                    <p>0 course selected for the class</p>
                                )}
                                {activeStep === 3 && (
                                    <p>1 timetable selected for the class</p>
                                )}
                            </div>
                            <div className="right">
                                {activeStep > 0 && (
                                    <Button
                                        onClick={() =>
                                            handleFormMovement(MoveType.BACK)
                                        }
                                    >
                                        Back
                                    </Button>
                                )}
                                {activeStep < 3 && (
                                    <Button
                                        onClick={() =>
                                            handleFormMovement(MoveType.NEXT)
                                        }
                                    >
                                        Next
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddClass;
