import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { useNavigate } from "react-router-dom"
import { RoleDefinitionSwitch } from "../../components/micro/role";
import { Input } from "../../common/forms/input";
import { Button } from "@mui/material";
import { createRoleDefinitionDetails } from "../../store/roles/actions";

const optionsArr = [
    { name: "No Access", value: 0 },
    { name: "Read Only", value: 1 },
    { name: "Read & Write", value: 2 },
    { name: "Read, Write & Delete", value: 3 },
    { name: "University Level Read", value: 4 },
]

const AddRoleDefinition = () => {

    const [lectures, setLectures] = useState(optionsArr[1])
    const [demandLetters, setDemandLetters] = useState(optionsArr[1])
    const [classes, setClasses] = useState(optionsArr[1])
    const [courses, setCourses] = useState(optionsArr[1])
    const [activities, setActivities] = useState(optionsArr[1])
    const [schedule, setSchedule] = useState(optionsArr[1])
    const [timetable, setTimetable] = useState(optionsArr[1])
    const [students, setStudents] = useState(optionsArr[0])
    const [faculties, setFaculties] = useState(optionsArr[0])
    const [staffs, setStaffs] = useState(optionsArr[0])
    const [chats, setChats] = useState(optionsArr[3])
    const [events, setEvents] = useState(optionsArr[4])
    const [library, setLibrary] = useState(optionsArr[4])
    const [roles, setRoles] = useState(optionsArr[0])
    const [notes, setNotes] = useState(optionsArr[3])
    const [calls, setCalls] = useState(optionsArr[3])
    const [collaborate, setCollaborate] = useState(optionsArr[3])
    const [name, setName] = useState("")

    const dispatch = useDispatch<any>();

    const navigate = useNavigate()

    const breadcrumps = useSelector((state: RootState) => state.breadcrumps);

    const universityID = useSelector((state: RootState) => state.university.university.value)

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["RESPONSIBILITIES", "Roles Definition", "Create"],
                link: "/roles/create",
            })
        );
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            name,
            lectures: lectures.value,
            demandLetters: demandLetters.value,
            classes: classes.value,
            courses: courses.value,
            activities: activities.value,
            schedule: schedule.value,
            timetable: timetable.value,
            students: students.value,
            faculties: faculties.value,
            staffs: staffs.value,
            chats: chats.value,
            events: events.value,
            library: library.value,
            roles: roles.value,
            notes: notes.value,
            calls: calls.value,
            collaborate: collaborate.value,
            universityID: universityID
        }
        dispatch(createRoleDefinitionDetails(data))
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

            <main className="createRole__Wrapper">
                <div className="paper">
                    <div className="createRole__Form">
                        <div className="header">
                            <h4>Define a new Role</h4>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="createRole__BasicInformation">
                                    <div className="col-lg-6 col-md-8 col-12">
                                        <Input 
                                            type="text"
                                            value={name}
                                            name="name"
                                            onChange={e => setName(e.target.value)}
                                            required
                                            autoComplete="Off"
                                            placeholder="Role Name"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={lectures} setSelected={setLectures} name="Lectures" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={demandLetters} setSelected={setDemandLetters} name="Demand Letters" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={classes} setSelected={setClasses} name="Classes" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={courses} setSelected={setCourses} name="Courses" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={activities} setSelected={setActivities} name="Activities" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={schedule} setSelected={setSchedule} name="Schedule" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={timetable} setSelected={setTimetable} name="Timetable" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={students} setSelected={setStudents} name="Students" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={faculties} setSelected={setFaculties} name="Faculties" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={staffs} setSelected={setStaffs} name="Staffs" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={chats} setSelected={setChats} name="Chats" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={events} setSelected={setEvents} name="Events" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={library} setSelected={setLibrary} name="Library" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={roles} setSelected={setRoles} name="Roles" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={notes} setSelected={setNotes} name="Notes" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={calls} setSelected={setCalls} name="Calls" />
                                <hr />
                                <RoleDefinitionSwitch  optionsArr={optionsArr} selected={collaborate} setSelected={setCollaborate} name="Collaborate" />
                                <div className="createRole__Button">
                                    <Button type="submit">Create Role</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddRoleDefinition;
