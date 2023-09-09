export interface FacultyState {
    faculties: [],
    faculty: {},
    display: {
        all: number,
        active: number,
        deleted: number
    }
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
}

export interface GetUniversityFacultyRequest {
    universityID: string;
    isActive: string
}