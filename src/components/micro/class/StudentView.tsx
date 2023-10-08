import React, { useEffect } from "react";
import { StudentCard } from "../../card/class";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getStudentFromClass } from "../../../store/student/actions";
import { getUserName } from "../../../utils/helpers";

const StudentView = () => {

    const classId = useSelector((state: RootState) => state.class.class._id)
    const students = useSelector((state: RootState) => state.student.students)

    const dispatch = useDispatch<any>()

    useEffect(()=>{
        if(classId)
            dispatch(getStudentFromClass(classId))
    }, [classId])
    return (
        <div>
            {students.map(s=><StudentCard key={s._id} name={getUserName(s.userID!)} />)}
        </div>
    );
};

export default StudentView;
