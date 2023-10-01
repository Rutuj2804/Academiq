import { NavigateFunction } from "react-router-dom"
import { PaginationInterface, StudentInterface } from "../../utils/types"

export interface StudentState {
    students: StudentInterface[],
    student: StudentInterface,
    display: {
        all: number,
        active: number,
        deleted: number
    },
    pagination : PaginationInterface
}

export interface CreateStudentRequest {
    universityID: string
    classID: string
    email: string
    enrollnmentNo: string
    admissionYear: string
    isActive: boolean
    address: string
    phone: string
    alternatePhone: string
    fathersName: string
    mothersName: string
    gender: string
    bloodGroup: string
    rollNumber: string
    extraField1: string
    extraField2: string
    navigate: NavigateFunction
}

export interface UpdateStudentRequest {
    universityID: string
    studentID: string
    classID: string
    email: string
    enrollnmentNo: string
    admissionYear: string
    isActive: boolean
    address: string
    phone: string
    alternatePhone: string
    fathersName: string
    mothersName: string
    gender: string
    bloodGroup: string
    rollNumber: string
    extraField1: string
    extraField2: string
    navigate: NavigateFunction
}

export interface GetUniversityStudentsRequest {
    universityID: string;
    isActive: string;
    page?: number;
}

export interface DeleteStudentsRequest {
    studentID: string[];
    universityID: string
}