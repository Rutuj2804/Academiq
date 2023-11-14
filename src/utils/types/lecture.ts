import { AuthInterface } from "./auth";
import { DocumentInterface } from "./base";
import { ClassInterface } from "./class";
import { CourseInterface } from "./course";

export interface LectureInterface extends DocumentInterface {
    classID: ClassInterface,
    courseID: CourseInterface,
    createdBy: AuthInterface,
    description: string,
    end: string,
    isActive: boolean,
    isCanceled: boolean,
    isRepeating: boolean,
    start: string,
    title: string,
    universityID: string,
}