import { NavigateFunction } from "react-router-dom";
import { CourseInterface } from "../../utils/types/course";

export interface CourseState {
    courses: CourseInterface[];
    course: CourseInterface;
    display: {
        all: number,
        active: number,
        deleted: number
    }
}

export interface GetCourseRequest {
    isActive: string;
    universityID: string;
}

export interface AddCourseRequest {
    name: string;
    description: string;
    universityID: string;
    navigate: NavigateFunction;
}
