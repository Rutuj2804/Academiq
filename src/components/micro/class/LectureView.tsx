import React from "react";
import { LectureCard } from "../../card/lecture";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getUserName } from "../../../utils/helpers";
import moment from "moment";

const LectureView = () => {
    const lectures = useSelector((state: RootState) => state.lecture.lectures);

    return (
        <div>
            {lectures.map((l) => (
                <LectureCard
                    key={l._id}
                    createdBy={getUserName(l.createdBy)}
                    createdAt={moment(l.createdAt!).format(
                        "dddd, DD MMM, YYYY"
                    )}
                    title={l.title!}
                    course={l.courseID.name!}
                    scheduledDate={l.start!}
                />
            ))}
        </div>
    );
};

export default LectureView;
