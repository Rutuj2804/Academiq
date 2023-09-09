export interface StudentState {
    students: [],
    student: {},
    display: {
        all: number,
        active: number,
        deleted: number
    }
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
}

export interface GetUniversityStudentsRequest {
    universityID: string;
    isActive: string
}