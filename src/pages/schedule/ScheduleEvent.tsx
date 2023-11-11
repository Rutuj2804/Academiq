import React, { useEffect, useState } from "react";
import { useCrypto } from "../../utils/hooks";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import moment from "moment";
import { Input } from "../../common/forms/input";
import { Textarea } from "../../common/forms/textarea";
import { Dropdown } from "../../common/forms/dropdown";
import { Button } from "@mui/material"
import { SelectUser } from "../../common/forms/select-users";

const repeatData = [
    { name: "Never", value: "NEVER" },
    { name: "Daily", value: "DAILY" },
    { name: "Weekly", value: "WEEKLY" },
    { name: "Monthly", value: "MONTHLY" },
    { name: "Yearly", value: "YEARLY" },
]

const ScheduleEvent = () => {
    const [formData, setFormData] = useState({
        title: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        allDay: false,
        description: ""
    });
    const [repeat, setRepeat] = useState(repeatData[0])
    const [until, setUntil] = useState("")

    const dispatch = useDispatch();

    const { decrypt, encrypt } = useCrypto();

    const { data } = useParams();

    const dataDecrypted = decrypt(data!);

    const { startDate, endDate, title, startTime, endTime, description } = formData;

    useEffect(() => {
        if (dataDecrypted) {
            var parsedData = JSON.parse(dataDecrypted);
            setFormData((f) => ({
                ...f,
                startDate: moment(parsedData.start).format("YYYY-MM-DD"),
                startTime: moment(parsedData.start).format("HH:mm"),
                endDate: moment(parsedData.end).format("YYYY-MM-DD"),
                endTime: moment(parsedData.end).format("HH:mm")
            }));
        }
    }, [dataDecrypted]);

    useEffect(() => {
        if (dataDecrypted)
            dispatch(
                setBreadcrumps({
                    name: ["ACADEMIC", "Schedules", "Add Event"],
                    link: `/schedule/event/${encrypt(dataDecrypted!)}`,
                })
            );
    }, [dispatch, dataDecrypted]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(f=>({ ...f, [e.target.name]: e.target.value }))
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData, repeat, until)
    }

    return (
        <div className="section__Wrapper">
            <main>
                <div className="paper">
                    <div className="scheduleEvent__Wrapper">
                        <h4>Schedule a Event</h4>
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
                                <div className="col-lg-6 col-md-6 col-12 mb-2">
                                    <Dropdown 
                                        optionsArr={repeatData}
                                        selected={repeat}
                                        setSelected={(t:any)=>setRepeat(t)}
                                        placeholder="Repeat"
                                    />
                                </div>
                                {repeat.value !== "NEVER" &&<div className="col-lg-6 col-md-6 col-12 mb-2">
                                    <Input
                                        type="date"
                                        name="until"
                                        value={until}
                                        placeholder="Repeat Until"
                                        onChange={e=>setUntil(e.target.value)}
                                        required
                                    />
                                </div>}
                                <div className="col-lg-6 col-md-6 col-12">
                                    <SelectUser
                                        count={2}
                                        placeholder="Participants"
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

export default ScheduleEvent;
