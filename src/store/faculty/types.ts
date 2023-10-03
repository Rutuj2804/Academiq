import { NavigateFunction } from "react-router-dom"
import { PaginationInterface } from "../../utils/types"
import { FacultyInterface } from "../../utils/types/faculty"

export interface FacultyState {
    faculties: FacultyInterface[],
    faculty: FacultyInterface,
    display: {
        all: number,
        active: number,
        deleted: number
    },
    pagination: PaginationInterface
}

export interface CreateFacultyRequest {
    universityID: string
    classID: string
    email: string
    enrollnmentNo: string
    joiningYear: string
    isActive: boolean
    address: string
    phone: string
    alternatePhone: string
    fathersName: string
    mothersName: string
    gender: string
    bloodGroup: string
    extraField1: string
    extraField2: string
    navigate: NavigateFunction
}

export interface UpdateFacultyRequest extends CreateFacultyRequest {
    facultyID: string
}

export interface GetUniversityFacultyRequest {
    universityID: string;
    isActive: string;
    page?: number;
}

export interface DeleteFacultyRequest {
    universityID: string;
    facultyID: string[];
}