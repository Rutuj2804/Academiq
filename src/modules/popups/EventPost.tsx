import React, { useRef } from "react";
import { useOutsideClickHandler } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { setEventPost } from "../../store/layout/slice";

const EventPost = () => {
    const dispatch = useDispatch();

    const eventPostRef = useRef<HTMLDivElement>(null);

    useOutsideClickHandler(eventPostRef, () =>
        dispatch(
            setEventPost({
                isOpen: false,
                id: "",
            })
        )
    );

    return (
        <div className="eventPost__Wrapper" ref={eventPostRef}>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                    <div className="eventPost__DescAndComments">
                        <div className="eventPost__PostDescription">
                            Description
                        </div>
                        <div className="eventPost__Comments">Comments</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPost;
