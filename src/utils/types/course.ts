import { AuthInterface } from "./auth";
import { DocumentInterface } from "./base";

export interface CourseInterface extends DocumentInterface {
    name?: string
    description?: string
    isActive?: boolean
    universityID?: string
    createdBy?: AuthInterface | string
    facultyId?: string[]
}