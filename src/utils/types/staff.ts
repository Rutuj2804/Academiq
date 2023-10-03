import { AuthInterface } from "./auth"
import { DocumentInterface } from "./base"

export interface StaffInterface extends DocumentInterface {
    address?: string
    joiningYear?: string
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