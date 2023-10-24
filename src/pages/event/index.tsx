import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { PostCard } from "../../components/card/event";

const Events = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["SOCIALS", "Events"],
                link: "/events",
            })
        );
    }, [dispatch]);

    return (
        <div className="section__Wrapper">
            <main className="events__Wrapper">
                <div className="row">
                    <div className="col-lg-3 col-md-2 col-12"></div>
                    <div className="col-lg-6 col-md-8 col-12">
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
