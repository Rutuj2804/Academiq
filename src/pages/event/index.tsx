import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { PostCard } from "../../components/card/event";
import { Avatar } from "@mui/material";
import { BsCameraVideo, BsImage } from "react-icons/bs";
import { MdOutlineAttachFile } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { getEvents } from "../../store/event/actions";

const Events = () => {
    const dispatch = useDispatch<any>();

    const navigate = useNavigate()

    const universityID = useSelector((state: RootState) => state.university.university.value)

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["SOCIALS", "Events"],
                link: "/events",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if(universityID) {
            dispatch(getEvents(universityID))
        }
    }, [universityID])

    return (
        <div className="section__Wrapper">
            <main className="events__Wrapper">
                <div className="row">
                    <div className="col-lg-3 col-md-2 col-12"></div>
                    <div className="col-lg-6 col-md-8 col-12">
                        <div className="events__CreateEvent" onClick={()=>navigate("/event/create")}>
                            <div className="top">
                                <Avatar />
                                <input placeholder="Share something..." />
                            </div>
                            <div className="bottom">
                                <div className="data-type">
                                    <BsImage />
                                    <p>Image</p>
                                </div>
                                <div className="data-type">
                                    <BsCameraVideo />
                                    <p>Video</p>
                                </div>
                                <div className="data-type">
                                    <MdOutlineAttachFile />
                                    <p>Video</p>
                                </div>
                            </div>
                        </div>
                        <PostCard liked comment />
                        <PostCard liked />
                        <PostCard comment />
                    </div>
                    <div className="col-lg-3 col-md-2 col-12"></div>
                </div>
            </main>
        </div>
    );
};

export default Events;
