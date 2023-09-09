import { AuthInterface } from "./auth";
import { DocumentInterface } from "./base";

export interface ClassInterface extends DocumentInterface {
    name?: string
    description?: string
    isActive?: boolean
    courseId?: string
    createdBy?: AuthInterface | string
    facultyId?: string
}