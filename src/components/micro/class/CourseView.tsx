import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { CourseCard } from "../../card/course";

const CourseView = () => {
    const courses = useSelector(
        (state: RootState) => state.class.class.courseID!
    );

    return (
        <div className="row">
            {courses.map((c) => (
                <div key={c._id} className="col-lg-4 col-md-6 col-12">
                    <CourseCard
                        name={c.name!}
                        description={c.description!}
                        isActive={c.isActive}
                        id={c._id!}
                    />
                </div>
            ))}
        </div>
    );
};

export default CourseView;
