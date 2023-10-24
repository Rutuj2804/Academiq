import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { LectureCard } from "../../components/card/lecture";

const Lectures = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["GENERAL", "Lectures"],
                link: "/lectures",
            })
        );
    }, [dispatch]);

    return (
        <div className="section__Wrapper">

            <main className="lecture__Wrapper">
                <div className="row">
                    <div className="col-lg-3 col-lg-2 col-12"></div>
                    <div className="col-lg-6 col-md-8 col-12">
                        <LectureCard />
                        <LectureCard />
                        <LectureCard />
                        <LectureCard />
                    </div>
                    <div className="col-lg-3 col-lg-2 col-12"></div>
                </div>
            </main>
        </div>
    );
};

export default Lectures;
