import { AuthInterface } from "./auth";
import { DocumentInterface } from "./base";

export interface ActivityInterface extends DocumentInterface {
    name?: string
    description?: string
    isActive?: boolean
    classId?: string
    universityID?: string
    createdBy?: AuthInterface | string
    files?: string[]
}