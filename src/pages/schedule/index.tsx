import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DateSelectArg } from "@fullcalendar/core";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../../utils/hooks";
import { getLectures } from "../../store/lecture/actions";
import { RootState } from "../../store";

const Schedules = () => {
    const dispatch = useDispatch<any>();

    const navigate = useNavigate()

    const { encrypt } = useCrypto()

    const universityID = useSelector(
        (state: RootState) => state.university.university.value
    );

    const lectures = useSelector((state: RootState) => state.lecture.lectures);

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["ACADEMIC", "Schedules"],
                link: "/schedules",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if (universityID) {
            dispatch(getLectures({ universityID }));
        }
    }, [dispatch, universityID]);

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        const data = JSON.stringify({ start: selectInfo.startStr, end: selectInfo.endStr, allDay: selectInfo.allDay })
        navigate(`/schedule/event/${encrypt(data)}`)
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
                            events={lectures}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Schedules;
