import React, { useEffect } from "react";
import FacultyCard from "../../card/class/FacultyCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getClassFaculty } from "../../../store/faculty/actions";
import { getUserName } from "../../../utils/helpers";

const FacultyView = () => {
    const classId = useSelector((state: RootState) => state.class.class._id);
    const faculties = useSelector(
        (state: RootState) => state.faculty.faculties
    );

    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (classId) dispatch(getClassFaculty(classId));
    }, [classId]);

    return (
        <div>
            {faculties.map((f) => (
                <FacultyCard key={f._id} name={getUserName(f.userID!)} />
            ))}
        </div>
    );
};

export default FacultyView;
