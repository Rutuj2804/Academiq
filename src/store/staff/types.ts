export interface StaffState {
    staffs: [],
    staff: {},
    display: {
        all: number,
        active: number,
        deleted: number
    }
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
    extraField2: string
}

export interface GetUniversityStaffRequest {
    universityID: string;
    isActive: string
}