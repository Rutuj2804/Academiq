import { AuthInterface } from "./auth";
import { DocumentInterface } from "./base";

export interface ClassInterface extends DocumentInterface {
    name?: string
    description?: string
    isActive?: boolean
    courseID?: string
    createdBy?: AuthInterface | string
    facultyID?: AuthInterface[]
    studentID?: AuthInterface[]
}