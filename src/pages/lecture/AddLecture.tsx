import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { Input } from "../../common/forms/input";
import { Dropdown } from "../../common/forms/dropdown";
import { Textarea } from "../../common/forms/textarea";
import { Button } from "@mui/material";
import { RootState } from "../../store";
import { getUniversityClass } from "../../store/class/actions";
import { getCourseFromClass } from "../../store/course/actions";
import { createLecture } from "../../store/lecture/actions";
import moment from "moment";

const repeatData = [
    { name: "Never", value: "NEVER" },
    { name: "Daily", value: "DAILY" },
    { name: "Weekly", value: "WEEKLY" },
    { name: "Monthly", value: "MONTHLY" },
    { name: "Yearly", value: "YEARLY" },
];

const AddLecture = () => {
    const [formData, setFormData] = useState({
        title: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        allDay: false,
        description: "",
    });
    const [repeat, setRepeat] = useState(repeatData[0]);
    const [lectureClasses, setLectureClasses] = useState<typeof repeatData>([]);
    const [selectedLectureClass, setSelectedLectureClass] = useState<
        (typeof repeatData)[0]
    >({ name: "", value: "" });
    const [lectureCourse, setLectureCourse] = useState<typeof repeatData>([]);
    const [selectedLectureCourse, setSelectedLectureCourse] = useState<
        (typeof repeatData)[0]
    >({ name: "", value: "" });
    const [until, setUntil] = useState("");

    const { startDate, endDate, title, startTime, endTime, description } =
        formData;

    const dispatch = useDispatch<any>();

    const universityID = useSelector(
        (state: RootState) => state.university.university.value
    );

    const classes = useSelector((state: RootState) => state.class.classes);

    const courses = useSelector((state: RootState) => state.course.courses);

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["GENERAL", "Lectures", "Add"],
                link: "/lectures/add",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if (universityID)
            dispatch(
                getUniversityClass({
                    universityID: universityID,
                    isActive: "T",
                })
            );
    }, [universityID, dispatch]);

    useEffect(() => {
        if (selectedLectureClass.value)
            dispatch(getCourseFromClass(selectedLectureClass.value));
    }, [selectedLectureClass, dispatch]);

    useEffect(() => {
        const classList = [];
        for (let i = 0; i < classes.length; i++) {
            classList.push({
                name: classes[i].name!,
                value: classes[i]._id!,
            });
        }
        setLectureClasses(classList);
    }, [classes, setLectureClasses]);

    useEffect(() => {
        const courseList = [];
        for (let i = 0; i < courses.length; i++) {
            courseList.push({
                name: courses[i].name!,
                value: courses[i]._id!,
            });
        }
        setLectureCourse(courseList);
    }, [courses, setLectureCourse]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            createLecture({
                title: title,
                universityID,
                classID: selectedLectureClass.value,
                courseID: selectedLectureCourse.value,
                start: moment(`${startDate} ${startTime}`, 'YYYY-MM-DD HH:mm').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                end: moment(`${endDate} ${endTime}`, 'YYYY-MM-DD HH:mm').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                description: description,
                isRepeating: repeat.value !== "NEVER",
                repeatType: repeat.value,
                repeatUntil: until!,
            })
        );
    };

    return (
        <div className="section__Wrapper">
            <main>
                <div className="paper">
                    <div className="scheduleEvent__Wrapper">
                        <h4>Schedule a Lecture</h4>
                        <form onSubmit={onSubmit}>
                            <div className="row">
                                <div className="col-12">
                                    <Input
                                        type="text"
                                        name="title"
                                        value={title}
                                        placeholder="Title"
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        type="date"
                                        name="startDate"
                                        value={startDate}
                                        placeholder="Start Date"
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        type="time"
                                        name="startTime"
                                        value={startTime}
                                        placeholder="Start Time"
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        type="date"
                                        name="endDate"
                                        value={endDate}
                                        placeholder="End Date"
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        type="time"
                                        name="endTime"
                                        value={endTime}
                                        placeholder="End Time"
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Dropdown
                                        optionsArr={repeatData}
                                        selected={repeat}
                                        setSelected={(t: any) => setRepeat(t)}
                                        placeholder="Repeat"
                                    />
                                </div>
                                {repeat.value !== "NEVER" && (
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <Input
                                            type="date"
                                            name="until"
                                            value={until}
                                            placeholder="Repeat Until"
                                            onChange={(e) =>
                                                setUntil(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                )}
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Dropdown
                                        optionsArr={lectureClasses}
                                        selected={selectedLectureClass}
                                        setSelected={(t: any) =>
                                            setSelectedLectureClass(t)
                                        }
                                        placeholder="Class"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Dropdown
                                        optionsArr={lectureCourse}
                                        selected={selectedLectureCourse}
                                        setSelected={(t: any) =>
                                            setSelectedLectureCourse(t)
                                        }
                                        placeholder="Course"
                                    />
                                </div>
                                <div className="col-12">
                                    <Textarea
                                        name="description"
                                        value={description}
                                        placeholder="Description"
                                        onChange={onChange}
                                        rows={5}
                                    />
                                </div>
                            </div>
                            <div className="scheduleEvent__Buttons">
                                <Button type="submit">Add Event</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddLecture;
