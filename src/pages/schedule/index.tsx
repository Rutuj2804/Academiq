import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DateSelectArg } from "@fullcalendar/core";
import { useNavigate } from "react-router-dom";

const Schedules = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Schedules"],
                link: "/schedules",
            })
        );
    }, [dispatch]);

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        navigate("/schedule/event")
        // let title = prompt("Please enter a new title for your event");
        // let calendarApi = selectInfo.view.calendar;

        // calendarApi.unselect(); // clear date selection

        // if (title) {
        //     calendarApi.addEvent({
        //         id: Date.now().toString(),
        //         title,
        //         start: selectInfo.startStr,
        //         end: selectInfo.endStr,
        //         allDay: selectInfo.allDay,
        //     });
        // }
    };

    return (
        <div className="section__Wrapper">
            <main className="schedule__Wrapper">
                <div className="paper">
                    <div className="schedule__Container">
                        <FullCalendar
                            plugins={[
                                dayGridPlugin,
                                interactionPlugin,
                                timeGridPlugin,
                            ]}
                            initialView="timeGridWeek"
                            headerToolbar={{
                                start: "prev,dayGridMonth,today,timeGridWeek,next",
                                center: "",
                                end: "title",
                            }}
                            selectable={true}
                            editable={true}
                            select={handleDateSelect}
                            eventAdd={(e) => console.log(e)}
                            eventChange={(e) => console.log(e)}
                            eventRemove={(e) => console.log(e)}
                            height={"80vh"}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Schedules;
