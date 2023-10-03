import { AuthInterface } from "./auth"
import { DocumentInterface } from "./base"

export interface FacultyInterface extends DocumentInterface {
    address?: string
    admissionYear?: string
    alternatePhone?: boolean
    bloodGroup?: string
    userID?: AuthInterface | string
    createdAt?: string
    enrollnmentNo?: string
    extraField1?: string
    extraField2?: string
    fathersName?: string
    gender?: string
    isActive?: boolean
    mothersName?: string
    phone?: string
    rollNumber?: string
    universityID?: string
    updatedAt?: string
}