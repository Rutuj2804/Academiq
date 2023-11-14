import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumps } from "../../store/breadcrumps/slice";
import { LectureCard } from "../../components/card/lecture";
import { RootState } from "../../store";
import { getLectures } from "../../store/lecture/actions";
import { getUserName } from "../../utils/helpers";
import moment from "moment";

const Lectures = () => {
    const dispatch = useDispatch<any>();

    const universityID = useSelector(
        (state: RootState) => state.university.university.value
    );

    const lectures = useSelector((state: RootState) => state.lecture.lectures);

    useEffect(() => {
        dispatch(
            setBreadcrumps({
                name: ["GENERAL", "Lectures"],
                link: "/lectures",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if (universityID) {
            dispatch(getLectures({ universityID }));
        }
    }, [dispatch, universityID]);

    return (
        <div className="section__Wrapper">
            <main className="lecture__Wrapper">
                <div className="row">
                    <div className="col-lg-3 col-lg-2 col-12"></div>
                    <div className="col-lg-6 col-md-8 col-12">
                        {lectures.map((l) => (
                            <LectureCard
                                key={l._id}
                                createdBy={getUserName(l.createdBy)}
                                createdAt={moment(l.createdAt!).format("dddd, DD MMM, YYYY")}
                                title={l.title!}
                                course={l.courseID.name!}
                                scheduledDate={l.start!}
                            />
                        ))}
                    </div>
                    <div className="col-lg-3 col-lg-2 col-12"></div>
                </div>
            </main>
        </div>
    );
};

export default Lectures;
