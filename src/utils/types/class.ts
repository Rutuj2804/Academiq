import { AuthInterface } from "./auth";
import { DocumentInterface } from "./base";
import { CourseInterface } from "./course";

export interface ClassInterface extends DocumentInterface {
    name?: string
    description?: string
    isActive?: boolean
    courseID?: CourseInterface[]
    createdBy?: AuthInterface | string
    facultyID?: AuthInterface[]
    studentID?: AuthInterface[]
}