import { NavigateFunction } from "react-router-dom";
import { CourseInterface } from "../../utils/types/course";
import { PaginationInterface } from "../../utils/types";

export interface CourseState {
    courses: CourseInterface[];
    course: CourseInterface;
    display: {
        all: number,
        active: number,
        deleted: number
    },
    pagination: PaginationInterface
}

export interface GetCoursesRequest {
    isActive: string;
    universityID: string;
    page?: number;
}

export interface GetCourseRequest {
    universityID: string;
    courseID: string
}

export interface AddCourseRequest {
    name: string;
    description: string;
    universityID: string;
    navigate: NavigateFunction;
}

export interface UpdateCourseRequest {
    name: string;
    description: string;
    universityID: string;
    courseID: string;
    navigate: NavigateFunction;
}

export interface DeleteCourseRequest {
    universityID: string;
    courseID: string[];
}

export interface DeleteAllCourseRequest {
    universityID: string;
}