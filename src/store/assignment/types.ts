import { NavigateFunction } from "react-router-dom";
import { ClassInterface } from "../../utils/types/class";

export interface AssignmentState {
    assignments: ClassInterface[]
}

export interface GetFacultyAssignmentRequest {
    universityID: string;
    facultyID: string
}

export interface GetCourseAssignmentRequest {
    universityID: string;
    courseID: string
}

export interface AddFacultyToClassRequest {
    universityID: string;
    classID: string;
    facultyID: string
}

export interface AddCourseToClassRequest {
    universityID: string;
    courseID: string;
    classID: string
}
