import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const CourseView = () => {

    const courses = useSelector((state: RootState) => state.class.class.courseID!)

    return <div>{courses.map(c=><div key={c._id}>{c.name}</div>)}</div>;
};

export default CourseView;
