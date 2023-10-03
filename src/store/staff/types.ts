import { NavigateFunction } from "react-router-dom"
import { PaginationInterface, StaffInterface } from "../../utils/types"

export interface StaffState {
    staffs: StaffInterface[],
    staff: StaffInterface,
    display: {
        all: number,
        active: number,
        deleted: number
    },
    pagination: PaginationInterface
}

export interface CreateStaffRequest {
    universityID: string
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
    extraField2: string;
    navigate: NavigateFunction
}

export interface GetUniversityStaffRequest {
    universityID: string;
    isActive: string;
    page? : number
}

export interface DeleteStaffRequest {
    staffID: string[];
    universityID: string
}