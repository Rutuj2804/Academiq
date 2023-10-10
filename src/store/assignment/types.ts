import { NavigateFunction } from "react-router-dom";
import { ClassInterface } from "../../utils/types/class";

export interface AssignmentState {
    assignments: ClassInterface[]
}

export interface GetAssignmentRequest {
    universityID: string;
    facultyID: string
}

export interface AddFacultyToClassRequest {
    universityID: string;
    classID: string;
    facultyID: string
}
